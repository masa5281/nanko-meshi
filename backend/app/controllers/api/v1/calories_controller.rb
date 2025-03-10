class Api::V1::CaloriesController < ApplicationController
  def create
    user = User.find_by(firebase_uid: params[:firebase_uid])
    calorie = user.calories.new(calorie_params)
    if calorie.save
      render json: calorie
    else
      render json: calorie.errors, status: :unprocessable_entity
    end
  end
  
  private
  
  def calorie_params
    params.require(:calorie).permit(:burned_calorie, :recorded_at)
  end
end
