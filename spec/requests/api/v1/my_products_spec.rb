require 'rails_helper'

RSpec.describe "Api::V1::MyProducts", type: :request do
  let(:valid_attributes) {
    {
      summary: "みんなが腰抜かすいい感じのプロダクト",
      description: "とにかく誰も見たことがないような素晴らしいプロダクトです。使った人全員腰抜かして歩けなくなります。",
      url: "https://product1.example.com",
    }
  }

  let(:invalid_attributes) {
    {
      summary: "",
      description: "とにかく誰も見たことがないような素晴らしいプロダクトです。使った人全員腰抜かして歩けなくなります。",
      url: "https://product1.example.com",
    }
  }

  let(:valid_headers) {
    login(user)
    get_auth_params_from_login_response_headers(response)
  }

  let(:invalid_headers) {
    {}
  }
  describe "GET /api/v1/my_products" do
    let(:user1) { FactoryBot.create(:user, :with_3_sp_point) }
    let(:user2) { FactoryBot.create(:user, :with_3_sp_point) }

    before do
      Product.destroy_all

      FactoryBot.create(:product, :approved, user: user1, summary: 'test product 1', created_at: Time.now - 3.seconds)
      FactoryBot.create(:product, :approved, user: user1, summary: 'test product 2', created_at: Time.now - 2.seconds)
      FactoryBot.create(:product, :approved, user: user2, summary: 'test product 3', created_at: Time.now - 1.seconds)
    end

    context "when login as user1" do
      let(:user) { user1 }
      it "should return 2 products" do
        get "/api/v1/my_products", headers: valid_headers
        json = JSON(response.body)
        expect(response).to have_http_status(200)
        expect(json.size).to eq(2)
      end
    end

    context "when login as user2" do
      let(:user) { user2 }
      it "should return 2 products" do
        get "/api/v1/my_products", headers: valid_headers
        json = JSON(response.body)
        expect(response).to have_http_status(200)
        expect(json.size).to eq(1)
      end
    end

  end

  describe "GET /api/v1/my_products/:id" do
    let(:user) { FactoryBot.create(:user) }
    let!(:product) { FactoryBot.create(:product, summary: 'test product 1', user: user) }

    before do
      product.tweets << FactoryBot.create(:tweet, tweet_id_on_twitter: '12345', tweet_url: 'http://www.example.com/12345')
    end

    it "should return a product" do
      get "/api/v1/my_products/#{product.id}", headers: valid_headers
      json = JSON(response.body)
      expect(response).to have_http_status(200)
      expect(json["summary"]).to eq("test product 1")
      expect(json["tweets"][0]["tweet_url"]).to eq("http://www.example.com/12345")
    end
  end

  describe "POST /api/v1/my_products" do
    let(:user) { FactoryBot.create(:user) }
    context "with valid params" do
      it "creates a new Product" do
        expect {
          post "/api/v1/my_products", params: {my_product: valid_attributes}, headers: valid_headers
        }.to change(Product, :count).by(1)
      end

      it "renders a JSON response with the new product" do

        post "/api/v1/my_products", params: {my_product: valid_attributes}, headers: valid_headers
        res = JSON(response.body)
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json; charset=utf-8')
        expect(res["summary"]).to eq("みんなが腰抜かすいい感じのプロダクト")
      end
    end

    context "with invalid params" do
      it "renders a JSON response with errors for the new hoge" do

        post "/api/v1/my_products", params: {my_product: invalid_attributes}, headers: valid_headers
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context "with invalid headers" do
      it "renders a JSON response with errors for the new hoge" do

        post "/api/v1/my_products", params: {product: valid_attributes}, headers: invalid_headers
        expect(response).to have_http_status(:unauthorized)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe "PUT #update" do
    let(:user) { FactoryBot.create(:user) }
    context "with valid params" do
      let(:new_attributes) {
        {
          summary: "みんなが腰抜かすいい感じのプロダクトです",
          description: "とにかく誰も見たことがないような素晴らしいプロダクトです。使った人全員腰抜かして歩けなくなります。",
          url: "https://product1.example.com",
        }
      }

      it "updates the requested hoge" do
        product = user.products.create! valid_attributes
        put "/api/v1/my_products/#{product.id}", params: {my_product: new_attributes}, headers: valid_headers
        product.reload
        expect(product.summary).to eq('みんなが腰抜かすいい感じのプロダクトです')
      end

      it "renders a JSON response with the product" do
        product = user.products.create! valid_attributes

        put "/api/v1/my_products/#{product.id}", params: {my_product: valid_attributes}, headers: valid_headers
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context "with invalid params" do
      it "renders a JSON response with errors for the hoge" do
        product = user.products.create! valid_attributes

        put "/api/v1/my_products/#{product.id}", params: {my_product: invalid_attributes}, headers: valid_headers
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context "with invalid headers" do
      it "renders a JSON response with errors for the new hoge" do
        product = user.products.create! valid_attributes

        put "/api/v1/my_products/#{product.id}", params: {my_product: valid_attributes}, headers: invalid_headers
        expect(response).to have_http_status(:unauthorized)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end

  describe "DELETE #destroy" do
    let(:user) { FactoryBot.create(:user) }
    context "with valid headers" do
      it "destroys the requested hoge" do
        product = user.products.create! valid_attributes

        expect {
          delete "/api/v1/my_products/#{product.id}", headers: valid_headers
        }.to change(Product, :count).by(-1)
      end
    end

    context "with invalid headers" do
      it "destroys the requested hoge" do
        product = user.products.create! valid_attributes

        expect {
          delete "/api/v1/my_products/#{product.id}", headers: invalid_headers
        }.not_to change(Product, :count)
      end
    end
  end

end
