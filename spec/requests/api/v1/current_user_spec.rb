require 'rails_helper'

RSpec.describe "Api::V1::CurrentUser", type: :request do
  let(:valid_headers) {
    login(user)
    get_auth_params_from_login_response_headers(response)
  }

  let(:invalid_headers) {
    {}
  }

  describe "GET /api/v1/current_user" do
    context "with valid headers" do
      let(:user) { FactoryBot.create(:user, name: 'foo_bar', image: 'https://www.foo.jpg') }

      before do
        user.status ||= Status.new(spread_point: 3)
      end

      it "should return current_user" do
        get "/api/v1/current_user", headers: valid_headers
        json = JSON(response.body)
        expect(response).to have_http_status(200)
        expect(json["name"]).to eq("foo_bar")
        expect(json["image"]).to eq("https://www.foo.jpg")
        expect(json["spPoint"]).to eq(3)
      end
    end

    context "with invalid headers" do
      let(:user) { FactoryBot.create(:user, image: 'https://www.foo.jpg') }

      before do
        user.status ||= Status.new(spread_point: 3)
      end

      it "should return 401" do
        get "/api/v1/current_user", headers: invalid_headers
        json = JSON(response.body)
        expect(response).to have_http_status(401)
      end
    end
  end

end
