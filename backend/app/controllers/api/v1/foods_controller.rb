class Api::V1::FoodsController < ApplicationController
  def index
    foods = Food.all
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

  private

  def food_params
    params.require(:food).permit(:name, :calorie, :food_image)
  end
end
