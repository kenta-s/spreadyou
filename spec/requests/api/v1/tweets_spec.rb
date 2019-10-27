require 'rails_helper'

RSpec.describe "Api::V1::Tweet", type: :request do
  let(:valid_attributes) {
    skip
  }

  let(:invalid_attributes) {
    skip
  }

  let(:valid_headers) {
    login(user)
    get_auth_params_from_login_response_headers(response)
  }

  let(:invalid_headers) {
    {}
  }

  xdescribe "GET /api/v1/tweets" do
  end

  xdescribe "GET /api/v1/tweets/:id" do
  end

  xdescribe "POST /api/v1/tweets" do
  end
end
