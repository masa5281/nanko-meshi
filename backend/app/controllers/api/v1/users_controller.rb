class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate_request, only: %i[create]

  def show
    user = User.find_by(firebase_uid: params[:firebase_uid])
    render json: user
  end

  def create
    user = User.new(user_params)
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
