class Api::V1::CaloriesController < ApplicationController
  def create
    calorie = Calorie.new(calorie_params)
    
    if calorie.save
      render json: { status: 200, calorie: calorie }
    else
      render json: calorie.errors, status: :unprocessable_entity
    end
  end
  
  private
  
  def calorie_params
    params.require(:calorie).permit(:burned_calorie, :recorded_at)
  end
end
