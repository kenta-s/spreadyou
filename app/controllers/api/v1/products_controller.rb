class Api::V1::ProductsController < ApplicationController
  before_action :authenticate_user!

  # GET /api/v1/products.json
  def index
    @products = Product.includes(user: :status).where.not(user: current_user).approved.where('statuses.spread_point > 0').references(:statuses).order(spread_at: :asc).order(created_at: :desc).limit(10)
  end

  # GET /api/v1/products/1.json
  def show
    @product = Product.find(params[:id])
  end

end
