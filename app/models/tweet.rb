class Tweet < ApplicationRecord
  belongs_to :product
  validates :tweet_id_on_twitter, presence: true
  validates :tweet_url, presence: true
  validates :content, presence: true, length: { maximum: 140 }
end
