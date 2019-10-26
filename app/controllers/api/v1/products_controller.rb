class Api::V1::ProductsController < ApplicationController
  before_action :set_api_v1_product, only: [:show, :update, :destroy]

  # GET /api/v1/products
  # GET /api/v1/products.json
  def index
    @products = Product.all.order(created_at: :desc)
  end

  # GET /api/v1/products/1
  # GET /api/v1/products/1.json
  def show
  end

  # POST /api/v1/products
  # POST /api/v1/products.json
  def create
    @product = current_user.products.new(product_params)

    if @product.save
      render :show, status: :created, location: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/products/1
  # PATCH/PUT /api/v1/products/1.json
  def update
    if @product.update(product_params)
      render :show, status: :ok, location: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/products/1
  # DELETE /api/v1/products/1.json
  def destroy
    @product.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def product_params
      params.fetch(:product, {})
    end
end
