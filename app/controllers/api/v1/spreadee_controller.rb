class Api::V1::SpreadeeController < ApplicationController
  before_action :authenticate_user!

  # GET /api/v1/products.json
  def index
    @product = Product.includes(user: :status).where.not(user: current_user).approved.where('statuses.spread_point > 0').references(:statuses).order(spread_at: :asc).order(created_at: :asc).first
    @tweet = current_user.tweets.find_by(product: @product)

    # if @product.nil?
    #   render error message
    # end
  end

end
