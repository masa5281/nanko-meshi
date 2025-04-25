class Api::V1::FoodsController < ApplicationController
  def index
    foods = current_user.foods
    render json: foods.as_json(only: [:id, :name, :calorie, :food_image])
  end

  def create
    food = current_user.foods.new(food_params)
    if food.save
      head :created
    else
      render json: food.errors, status: :unprocessable_entity
    end
  end

  def update
    food = Food.find(params[:id])
    if food.update(food_params)
      render json: food.as_json(only: [:id, :name, :calorie, :food_image])
    else
      render json: food.errors, status: :unprocessable_entity
    end
  end

  def destroy
    food = Food.find(params[:id])
    if food
      food.destroy
      head :no_content
    else
      render json: food.errors, status: :not_found
    end
  end

  def other
    foods = Food.where.not(user_id: current_user.id)
    render json: foods
  end

  private

  def food_params
    params.require(:food).permit(:name, :calorie, :food_image)
  end
end
