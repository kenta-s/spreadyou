class ApplicationController < ActionController::Base
# class ApplicationController < ActionController::API
  skip_before_action :verify_authenticity_token
  include DeviseTokenAuth::Concerns::SetUserByToken
  # skip_before_action :verify_authenticity_token, if: :devise_controller?
end
