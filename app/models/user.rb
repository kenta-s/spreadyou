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

  # http://127.0.0.1:3000/api/v1/auth/twitter?auth_origin_url=http://localhost:5000/twitter_connected
  #
  # http://127.0.0.1:3000/api/v1/auth/twitter?auth_origin_url=http://127.0.0.1:3000/api/v1/auth/:provider/callback
  def twitter_client
    @twitter_client ||= Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['TWITTER_CONSUMER_KEY']
      config.consumer_secret     = ENV['TWITTER_CONSUMER_SECRET']
      # config.access_token        = "YOUR_ACCESS_TOKEN"
      # config.access_token_secret = "YOUR_ACCESS_SECRET"
    end
  end
end
