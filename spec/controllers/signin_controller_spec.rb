require 'rails_helper'

RSpec.describe SigninController, type: :controller do

  describe "GET :index" do
    it "should return 200" do
      get :index
      expect(response).to have_http_status(200)
    end
  end

end
