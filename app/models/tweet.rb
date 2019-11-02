class Tweet < ApplicationRecord
  belongs_to :user
  belongs_to :product
  validates :content, presence: true, length: { maximum: 20 }
  validates :user, uniqueness: { scoped: :product }
  validate :user_cannot_be_product_user

  enum status: {
    pending: 0,
    tweeted: 1,
    cannot_be_found: 2,
  }

  private

  def user_cannot_be_product_user
    return unless user == product.try(:user)
    errors[:user] << 'is invalid'
  end

end
