class Api::V1::FoodsController < ApplicationController
  def index
    foods = current_user.foods
    render json: foods
  end

  def create
    food = current_user.foods.new(food_params)
    if food.save
      render json: food
    else
      render json: food.errors, status: :unprocessable_entity
    end
  end

  def update
    food = Food.find(params[:id])
    if food.update(food_params)
      render json: food
    else
      render json: food.errors, status: :unprocessable_entity
    end
  end

  private

  def food_params
    params.require(:food).permit(:name, :calorie, :food_image)
  end
end
