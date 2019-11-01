require 'rails_helper'

RSpec.describe "Api::V1::Products", type: :request do
  let(:valid_headers) {
    login(user)
    get_auth_params_from_login_response_headers(response)
  }

  let(:invalid_headers) {
    {}
  }
  describe "GET /api/v1/spreadee" do
    let(:user1) { FactoryBot.create(:user, :with_3_sp_point) }
    let(:user2) { FactoryBot.create(:user, :with_3_sp_point) }
    let(:user3) { FactoryBot.create(:user, :with_3_sp_point) }

    context "when already tweeted" do
      before do
        product = FactoryBot.create(:product, :approved, user: user3, summary: 'test product 1', created_at: Time.now - 3.seconds)
        FactoryBot.create(:product, :approved, user: user1, summary: 'test product 2', created_at: Time.now - 2.seconds)
        FactoryBot.create(:tweet, user: user, product: product)
      end
      let(:user) { user1 }
      it "should return a spreadee" do
        get "/api/v1/spreadee", headers: valid_headers
        json = JSON(response.body)
        expect(response).to have_http_status(200)
        expect(json["summary"]).not_to be_empty
        expect(json["isSpread"]).to be true
      end
    end

    context "when not tweeted" do
      before do
        product = FactoryBot.create(:product, :approved, user: user3, summary: 'test product 1', created_at: Time.now - 3.seconds)
        FactoryBot.create(:product, :approved, user: user1, summary: 'test product 2', created_at: Time.now - 2.seconds)
      end
      let(:user) { user1 }
      it "should return a spreadee" do
        get "/api/v1/spreadee", headers: valid_headers
        json = JSON(response.body)
        expect(response).to have_http_status(200)
        expect(json["summary"]).not_to be_empty
        expect(json["isSpread"]).to be false
      end
    end

  end

end
