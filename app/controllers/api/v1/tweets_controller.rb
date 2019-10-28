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
    if tweet!
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

    def tweet!
      Tweet.transaction do
        product = Product.find_by(id: tweet_params[:product_id])
        return false if product.blank? || product.user == current_user
        content = tweet_params.dig(:content)
        text = "#{content} #{product.url}\n\n---あなたもspreadyouでプロダクトを広めてみませんか？ https://www.spreadyou.net"
        res = twitter_client.update(text)
        # res.text
        # => "ほげ"
        # res.id.to_s
        # => "1188355354834325506"
        # res.url.to_s
        # => "https://twitter.com/kenta_s_dev/status/1188355354834325506"
        # @tweet = Tweet.new(tweet_params)
        @tweet = product.tweets.create!(
          tweet_id_on_twitter: res.id.to_s,
          tweet_url: res.url.to_s,
          content: res.text,
        )

        current_user.gain_sp_point!(3)
        product.user.consume_sp_point!(1)
      end

      true
    end
end
