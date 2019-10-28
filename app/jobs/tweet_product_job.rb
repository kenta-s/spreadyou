class TweetProductJob < ApplicationJob
  # queue_as :default
  queue_as :tweet

  def perform(tweet_id:)
    tweet = Tweet.find(tweet_id)
    return unless tweet.pending?
    client = tweet.user.twitter_client
    # Tweet.transaction do
    #   product = tweet.product
    #   from_user = tweet.user
    #   return false product.user == from_user
    #   tweet.tweet_url = ''
    #   tweet.tweet_id_on_twitter = ''
    #   content = tweet_content
    #   text = "#{content} #{product.url}\n\n---あなたもspreadyouでプロダクトを広めてみませんか？ https://www.spreadyou.net"
    #   res = twitter_client.update(text)
    #   # res.text
    #   # => "ほげ"
    #   # res.id.to_s
    #   # => "1188355354834325506"
    #   # res.url.to_s
    #   # => "https://twitter.com/kenta_s_dev/status/1188355354834325506"
    #   # @tweet = Tweet.new(tweet_params)
    #   tweet = product.tweets.create!(
    #     tweet_id_on_twitter: res.id.to_s,
    #     tweet_url: res.url.to_s,
    #     content: res.text,
    #   )

    #   from_user.gain_sp_point!(3)
    #   product.user.consume_sp_point!(1)
    # end
  end
end
