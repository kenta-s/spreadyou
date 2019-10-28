require 'rails_helper'

RSpec.describe "Api::V1::Products", type: :request do
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

  describe "GET /api/v1/products" do
    context "when there are 3 products" do
      let(:user1) { FactoryBot.create(:user, :with_3_sp_point) }
      let(:user2) { FactoryBot.create(:user, :with_3_sp_point) }
      let(:user3) { FactoryBot.create(:user, :with_3_sp_point) }

      before do
        Product.destroy_all

        FactoryBot.create(:product, :approved, user: user3, summary: 'test product 1', created_at: Time.now - 3.seconds)
        FactoryBot.create(:product, :approved, user: user1, summary: 'test product 2', created_at: Time.now - 2.seconds)
        FactoryBot.create(:product, :approved, user: user3, summary: 'test product 3', created_at: Time.now - 1.seconds)
      end
      context "and logged in as non owner" do
        let(:user) { user2 }
        it "should return 3 products" do
          get "/api/v1/products", headers: valid_headers
          json = JSON(response.body)
          expect(response).to have_http_status(200)
          expect(json.size).to eq(3)
          expect(json[0]["summary"]).to eq("test product 3")
          expect(json[1]["summary"]).to eq("test product 2")
          expect(json[2]["summary"]).to eq("test product 1")
        end
      end

      context "and logged in as an owner" do
        let(:user) { user1 }

        it "should return 2 products" do
          get "/api/v1/products", headers: valid_headers
          json = JSON(response.body)
          expect(response).to have_http_status(200)
          expect(json.size).to eq(2)
          expect(json[0]["summary"]).to eq("test product 3")
          expect(json[1]["summary"]).to eq("test product 1")
        end
      end
    end

    context "when there are 3 spread products" do
      let(:user) { FactoryBot.create(:user) }

      before do
        Product.destroy_all
        FactoryBot.create(:product, :approved, user: FactoryBot.create(:user, :with_3_sp_point, email: "hoge1@example.com"), summary: "test product 1", spread_at: Time.now - 3.seconds)
        FactoryBot.create(:product, :approved, user: FactoryBot.create(:user, :with_3_sp_point, email: "hoge2@example.com"), summary: "test product 2", spread_at: Time.now - 2.seconds)
        FactoryBot.create(:product, :approved, user: FactoryBot.create(:user, :with_3_sp_point, email: "hoge3@example.com"), summary: "test product 3", spread_at: Time.now - 1.seconds)
      end

      context "and 8 non spread products" do
        before do
          8.times.with_index(4) do |_, i|
            FactoryBot.create(:product, :approved, user: FactoryBot.create(:user, :with_3_sp_point, email: "hoge#{i+1}@example.com"), summary: "test product #{i}", spread_at: nil, created_at: Time.now - i.seconds)
          end
        end

        it "should return 10 products" do
          get "/api/v1/products", headers: valid_headers
          json = JSON(response.body)
          expect(response).to have_http_status(200)
          expect(json.size).to eq(10)
          8.times do |i|
            expect(json[i]["spreadAt"]).to be_nil
          end
          expect(json[8]["summary"]).to eq('test product 1')
          expect(json[8]["spreadAt"]).not_to be_nil
          expect(json[9]["summary"]).to eq('test product 2')
          expect(json[9]["spreadAt"]).not_to be_nil
        end
      end
    end

    context "when 3 products but 1 of them is created by no sp_point user" do
      let(:user) { FactoryBot.create(:user) }

      before do
        Product.destroy_all
        FactoryBot.create(:product, :approved, user: FactoryBot.create(:user, :with_3_sp_point), summary: "test product 1", spread_at: Time.now - 3.seconds)
        FactoryBot.create(:product, :approved, user: FactoryBot.create(:user, :with_3_sp_point), summary: "test product 2", spread_at: Time.now - 2.seconds)
        FactoryBot.create(:product, :approved, user: FactoryBot.create(:user, :with_0_sp_point), summary: "test product 3", spread_at: Time.now - 1.seconds)
      end

      it "should return 2 products" do
        get "/api/v1/products", headers: valid_headers
        json = JSON(response.body)
        expect(response).to have_http_status(200)
        expect(json.size).to eq(2)
        expect(json[0]["summary"]).to eq('test product 1')
        expect(json[1]["summary"]).to eq('test product 2')
      end
    end
  end

  describe "GET /api/v1/products/:id" do
    let(:user) { FactoryBot.create(:user) }
    let!(:product1) { FactoryBot.create(:product, summary: 'test product 1') }
    let!(:product2) { FactoryBot.create(:product, summary: 'test product 2') }

    context "when product: product1" do
      let(:product) { product1 }

      it "should return a product" do
        get "/api/v1/products/#{product.id}", headers: valid_headers
        json = JSON(response.body)
        expect(response).to have_http_status(200)
        expect(json["summary"]).to eq("test product 1")
      end
    end

    context "when product: product2" do
      let(:product) { product2 }

      it "should return a product" do
        get "/api/v1/products/#{product.id}", headers: valid_headers
        json = JSON(response.body)
        expect(response).to have_http_status(200)
        expect(json["summary"]).to eq("test product 2")
      end
    end
  end

  describe "POST /api/v1/products" do
    let(:user) { FactoryBot.create(:user) }
    context "with valid params" do
      it "creates a new Product" do
        expect {
          post "/api/v1/products", params: {product: valid_attributes}, headers: valid_headers
        }.to change(Product, :count).by(1)
      end

      it "renders a JSON response with the new product" do

        post "/api/v1/products", params: {product: valid_attributes}, headers: valid_headers
        res = JSON(response.body)
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json; charset=utf-8')
        expect(res["summary"]).to eq("みんなが腰抜かすいい感じのプロダクト")
      end
    end

    context "with invalid params" do
      it "renders a JSON response with errors for the new hoge" do

        post "/api/v1/products", params: {product: invalid_attributes}, headers: valid_headers
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context "with invalid headers" do
      it "renders a JSON response with errors for the new hoge" do

        post "/api/v1/products", params: {product: valid_attributes}, headers: invalid_headers
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
        put "/api/v1/products/#{product.id}", params: {product: new_attributes}, headers: valid_headers
        product.reload
        expect(product.summary).to eq('みんなが腰抜かすいい感じのプロダクトです')
      end

      it "renders a JSON response with the product" do
        product = user.products.create! valid_attributes

        put "/api/v1/products/#{product.id}", params: {product: valid_attributes}, headers: valid_headers
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context "with invalid params" do
      it "renders a JSON response with errors for the hoge" do
        product = user.products.create! valid_attributes

        put "/api/v1/products/#{product.id}", params: {product: invalid_attributes}, headers: valid_headers
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context "with invalid headers" do
      it "renders a JSON response with errors for the new hoge" do
        product = user.products.create! valid_attributes

        put "/api/v1/products/#{product.id}", params: {product: valid_attributes}, headers: invalid_headers
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
          delete "/api/v1/products/#{product.id}", headers: valid_headers
        }.to change(Product, :count).by(-1)
      end
    end

    context "with invalid headers" do
      it "destroys the requested hoge" do
        product = user.products.create! valid_attributes

        expect {
          delete "/api/v1/products/#{product.id}", headers: invalid_headers
        }.not_to change(Product, :count)
      end
    end
  end
end
