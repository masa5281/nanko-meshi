class Api::V1::UsersController < ApplicationController
  def create
    user = User.new(user_params)
    
    binding.pry
    if user.save
      render json: { status: 200, user: user }
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:firebase_uid, :name)
  end
end
