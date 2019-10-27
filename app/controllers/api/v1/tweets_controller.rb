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
    @tweet = Tweet.new(tweet_params)

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
      params.fetch(:tweet, {}).permit(:product_id)
    end
end
