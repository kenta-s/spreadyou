class TweetProductJob < ApplicationJob
  queue_as :tweet

  attr :tweet

  def perform(tweet_id:)
    @tweet = Tweet.find(tweet_id)
    return unless tweet.pending?

    # I want to make this situation better
    return if user.sp_point.zero?
    Tweet.transaction do
      product = tweet.product
      from_user = user
      # text = "#{tweet.content} #{product.url}\n\n---spreadyouでプロダクトを広めてみませんか？ https://www.spreadyou.net"

      text = 'ツイッター連携周りの機能テスト中です。ご迷惑をおかけしてますm(__)m'
      res = client.update(text)
      tweet.update!(
        tweet_id_on_twitter: res.id.to_s,
        tweet_url: res.url.to_s,
        status: :tweeted,
      )

      from_user.gain_sp_point!(3)
      product.user.consume_sp_point!(1)
    end
  end

  private

  # http://127.0.0.1:3000/api/v1/auth/twitter?auth_origin_url=http://localhost:5000/twitter_connected
  #
  # http://127.0.0.1:3000/api/v1/auth/twitter?auth_origin_url=http://127.0.0.1:3000/api/v1/auth/:provider/callback
  def client
    @client ||= Twitter::REST::Client.new do |config|
      config.consumer_key        = Rails.application.credentials.dig(:twitter, :consumer_key)
      config.consumer_secret     = Rails.application.credentials.dig(:twitter, :consumer_secret)
      config.access_token        = user.twitter_access_token
      config.access_token_secret = user.twitter_secret_token
    end
  end

  def user
    @user ||= tweet.user
  end
end
