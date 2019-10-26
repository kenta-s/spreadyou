class Product < ApplicationRecord
  belongs_to :user

  validates :summary, presence: true, length: { minimum: 3, maximum: 30 }
  validates :description, presence: true, length: { minimum: 3, maximum: 500 }
  validates :url, presence: true, length: { maximum: 190 }
end