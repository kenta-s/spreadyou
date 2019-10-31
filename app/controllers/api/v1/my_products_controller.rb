class Api::V1::MyProductsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_my_product, only: [:show, :update, :destroy]

  # GET /api/v1/my_products
  # GET /api/v1/my_products.json
  def index
    @my_products = current_user.products.includes(:tweets)
  end

  # GET /api/v1/my_products/1
  # GET /api/v1/my_products/1.json
  def show
  end

  # POST /api/v1/my_products
  # POST /api/v1/my_products.json
  def create
    @my_product = current_user.products.new(my_product_params)

    if @my_product.save
      render :show, status: :created
    else
      render json: @my_product.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/my_products/1
  # PATCH/PUT /api/v1/my_products/1.json
  def update
    if @my_product.update(my_product_params)
      render :show, status: :ok
    else
      render json: @my_product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/my_products/1
  # DELETE /api/v1/my_products/1.json
  def destroy
    @my_product.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_my_product
      @my_product = Product.includes(:tweets).find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def my_product_params
      params.fetch(:my_product, {}).permit(:summary, :description, :url)
    end
end
