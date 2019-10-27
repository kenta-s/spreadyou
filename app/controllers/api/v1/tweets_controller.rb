class Api::V1::TweetsController < ApplicationController
  before_action :set_tweet, only: [:show, :update]

  # GET /api/v1/tweets.json
  def index
    @tweets = Tweet.all
  end

  # GET /api/v1/tweets/1.json
  def show
  end

  # POST /api/v1/tweets.json
  def create
    product = Product.find(tweet_params[:product_id])
    text = tweet_params.dig(:content)
    # use Twitter API
    res = twitter_client.update(text)
    res.text
    # "ほげ"
    res.id.to_s
    # "1188355354834325506"
    res.url.to_s
    # "https://twitter.com/kenta_s_dev/status/1188355354834325506"
    # @tweet = Tweet.new(tweet_params)
    @tweet = current_user.tweets.new(
      tweet_id_on_twitter: res.id.to_s,
      tweet_url: res.url.to_s,
      content: res.text,
    )

    current_user.gain_sp_point!

    if @tweet.save
      render :show, status: :created, location: @tweet
    else
      render json: @tweet.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tweet
      @tweet = Tweet.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def tweet_params
      params.fetch(:tweet, {}).permit(:product_id, :content)
    end
end
