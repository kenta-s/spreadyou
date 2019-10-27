require 'rails_helper'

RSpec.describe "Api::V1::Tweet", type: :request do
  let(:user) { FactoryBot.create(:user) }
  let!(:product) { FactoryBot.create(:product, user: FactoryBot.create(:user, :with_3_sp_point)) }

  let(:valid_attributes) {
    {
      product_id: product.id,
      content: 'これ良いです',
    }
  }

  let(:invalid_attributes) {
    {
      product_id: nil,
      content: 'これ良いです',
    }
  }

  let(:valid_headers) {
    login(user)
    get_auth_params_from_login_response_headers(response)
  }

  let(:invalid_headers) {
    {}
  }

  let(:client) {
    instance_double('twitter client')
  }

  before(:each) do
    allow_any_instance_of(ApplicationController).to receive(:twitter_client).and_return(client)
  end

  xdescribe "GET /api/v1/tweets" do
  end

  xdescribe "GET /api/v1/tweets/:id" do
  end

  describe "POST /api/v1/tweets" do
    let(:tweet_response) do
      instance_double('tweet object')
    end
    context "with valid params" do
      before do
        expect(client).to receive(:update).with("これ良いです https://proprogramming.example.com\n\n---あなたもspreadyouでプロダクトを広めてみませんか？ https://www.spreadyou.net").and_return(tweet_response).once
        expect(tweet_response).to receive(:text).and_return("これ良いです https://proprogramming.example.com\n\n---あなたもspreadyouでプロダクトを広めてみませんか？ https://www.spreadyou.net").once
        expect(tweet_response).to receive(:id).and_return(12345678).once
        expect(tweet_response).to receive(:url).and_return('https://www.example.com/hoge/status/12345678').once
      end
 
      it "creates a new Tweet" do
        expect {
          post "/api/v1/tweets", params: {tweet: valid_attributes}, headers: valid_headers
        }.to change(Tweet, :count).by(1)
      end

      it "renders a JSON response with the new tweet" do

        post "/api/v1/tweets", params: {tweet: valid_attributes}, headers: valid_headers
        res = JSON(response.body)
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json; charset=utf-8')
        expect(res["content"]).to eq("これ良いです https://proprogramming.example.com\n\n---あなたもspreadyouでプロダクトを広めてみませんか？ https://www.spreadyou.net")
        expect(res["tweet_url"]).to eq("https://www.example.com/hoge/status/12345678")
      end
    end

    context "with invalid params" do
      it "renders a JSON response with errors for the new tweet" do

        post "/api/v1/tweets", params: {tweet: invalid_attributes}, headers: valid_headers
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end

    context "with invalid headers" do
      it "renders a JSON response with errors for the new tweet" do

        post "/api/v1/tweets", params: {tweet: valid_attributes}, headers: invalid_headers
        expect(response).to have_http_status(:unauthorized)
        expect(response.content_type).to eq('application/json; charset=utf-8')
      end
    end
  end
end
