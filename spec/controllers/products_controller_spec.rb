require 'rails_helper'

RSpec.describe ProductsController, type: :controller do
  describe "GET :index" do
    it "should return 200" do
      get :index
      expect(response).to have_http_status(200)
    end
  end

  describe "GET :show" do
    let(:product) { FactoryBot.create(:product) }
    it "should return 200" do
      get :show, params: {id: product.id}
      expect(response).to have_http_status(200)
    end
  end
end
