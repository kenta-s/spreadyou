class Tweet < ApplicationRecord
  belongs_to :user
  validates :tweet_id_on_twitter, presence: true
  validates :content, presence: true, length: { maximum: 100 }
end
