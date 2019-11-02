# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :tweets, dependent: :destroy
  has_many :products, dependent: :destroy
  has_one :status, dependent: :destroy
  has_one :twitter_credential, dependent: :destroy

  # def twitter_access_token
  delegate :access_token, to: :twitter_credential, prefix: 'twitter'

  # def twitter_secret_token
  delegate :secret_token, to: :twitter_credential, prefix: 'twitter'

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

  def sp_point
    if self.status.nil?
      self.status ||= Status.new(spread_point: 0)
      self.status.save
      return 0
    else
      self.status.spread_point
    end
  end
end
