class Api::V1::CaloriesController < ApplicationController
  def index
    calories = current_user.calories
    render json: calories.as_json(only: [:id, :burned_calorie, :recorded_at])
  end

  def create
    calorie = @current_user.calories.new(calorie_params)
    if calorie.save
      head :created
    else
      render json: calorie.errors, status: :unprocessable_entity
    end
  end
  
  private
  
  def calorie_params
    params.require(:calorie).permit(:burned_calorie, :recorded_at)
  end
end
