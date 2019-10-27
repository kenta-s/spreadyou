# class ApplicationController < ActionController::Base
class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
# before_action :skip_session
  # skip_before_action :verify_authenticity_token, if: :devise_controller?
  def twitter_client
    @twitter_client ||= Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['TWITTER_CONSUMER_KEY']
      config.consumer_secret     = ENV['TWITTER_CONSUMER_SECRET']
      # config.access_token        = "YOUR_ACCESS_TOKEN"
      # config.access_token_secret = "YOUR_ACCESS_SECRET"
    end
  end

  # protected

  #   def skip_session
  #     request.session_options[:skip] = true
  #   end

end
