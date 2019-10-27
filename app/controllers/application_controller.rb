# class ApplicationController < ActionController::Base
class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  # skip_before_action :verify_authenticity_token, if: :devise_controller?

  # http://127.0.0.1:3000/api/v1/auth/twitter?omniauth_window_type=newWindow
  def twitter_client
    @twitter_client ||= Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['TWITTER_CONSUMER_KEY']
      config.consumer_secret     = ENV['TWITTER_CONSUMER_SECRET']
      # config.access_token        = "YOUR_ACCESS_TOKEN"
      # config.access_token_secret = "YOUR_ACCESS_SECRET"
    end
  end

end
