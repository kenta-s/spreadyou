class Api::V1::CurrentUserController < ApplicationController
  before_action :authenticate_user!

  def index
  end
end
