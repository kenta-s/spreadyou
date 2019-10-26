class Status < ApplicationRecord
  belongs_to :user

  validates :spread_point, presence: true
end
