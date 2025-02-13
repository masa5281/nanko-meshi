class CaloriesController < ApplicationController
  def create
    calorie = Calorie.new(calorie_params)

    if calorie.save
      render json: { status: 200, calorie: calorie }
    else
      render json: { status: 500, message: "カロリーの入力に失敗しました" }
    end
  end
  
  private
  
  # フロントから送られてくるデータ
  def calorie_params
    params.require(:calorie).permit(:burned_calorie, :recorded_at)
  end
end
