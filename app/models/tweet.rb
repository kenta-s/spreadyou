class Tweet < ApplicationRecord
  belongs_to :user
  belongs_to :product
  # validates :tweet_id_on_twitter, presence: true
  # validates :tweet_url, presence: true
  validates :content, presence: true, length: { maximum: 20 }
  validate :user_cannot_be_product_user

  enum status: {
    pending: 0,
    tweeted: 1,
    not_found: 2,
  }

  private

  def user_cannot_be_product_user
    return unless user == product.try(:user)
    errors[:user] << 'is invalid'
  end

end
