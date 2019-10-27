# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :products, dependent: :destroy
  has_many :tweets, dependent: :destroy
  has_one :status, dependent: :destroy

  # validates :name, presence: true, length: { minimum: 3, maximum: 20 }

  def gain_sp_point!(point)
    self.status ||= Status.new(spread_point: 0)
    self.status.spread_point += point
    self.status.save!
  end

  def consume_sp_point!(point)
    raise 'user does not have enough sp point' if self.status.nil? || point > self.status.spread_point
    self.status.spread_point -= point
    self.status.save!
  end
end
