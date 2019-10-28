require 'rails_helper'

RSpec.describe TweetProductJob, type: :job do
  describe "perform" do
    let(:tweet) { FactoryBot.create(:tweet, :pending) }

    xit "should create a Tweet" do
      expect{ TweetProductJob.perform_now(tweet_id: tweet.id) }.to change{ tweet.reload.tweet_url }.from(nil).to('')
    end
  end
end
