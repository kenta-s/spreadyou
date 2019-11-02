class Api::V1::TweetsController < ApplicationController
  before_action :authenticate_user!, only: [:create]
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
    @tweet = current_user.tweets.new(
      product: Product.find_by(id: tweet_params.dig(:product_id)),
      content: tweet_params.dig(:content),
    )
    if @tweet.save
      # TweetProductJob.perform_later(tweet_id: @tweet.id)
      render :show, status: :created
    else
      render json: {}, status: :unprocessable_entity
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
