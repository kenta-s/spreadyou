require 'rails_helper'

RSpec.describe "Api::V1::Products", type: :request do
  describe "GET /api/v1/products" do
    before do
      FactoryBot.create(:product, summary: 'test product 1')
      FactoryBot.create(:product, summary: 'test product 2')
      FactoryBot.create(:product, summary: 'test product 3')
    end

    it "should return 3 products" do
      get "/api/v1/products"
      json = JSON(response.body)
      expect(response).to have_http_status(200)
      expect(json.size).to eq(3)
      expect(json[0]["summary"]).to eq("test product 3")
      expect(json[1]["summary"]).to eq("test product 2")
      expect(json[2]["summary"]).to eq("test product 1")
    end
  end

  describe "GET /api/v1/products/:id" do
    let!(:product1) { FactoryBot.create(:product, summary: 'test product 1') }
    let!(:product2) { FactoryBot.create(:product, summary: 'test product 2') }

    context "when product: product1" do
      let(:product) { product1 }

      it "should return a product" do
        get "/api/v1/products/#{product.id}"
        json = JSON(response.body)
        expect(response).to have_http_status(200)
        expect(json["summary"]).to eq("test product 1")
      end
    end

    context "when product: product2" do
      let(:product) { product2 }

      it "should return a product" do
        get "/api/v1/products/#{product.id}"
        json = JSON(response.body)
        expect(response).to have_http_status(200)
        expect(json["summary"]).to eq("test product 2")
      end
    end
  end
end
