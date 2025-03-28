class Api::V1::UsersController < ApplicationController
  skip_before_action :authenticate_request, only: %i[create]

  def show
    user = User.find_by(firebase_uid: params[:firebase_uid])
    render json: user.as_json(only: [:id, :name, :avatar, :weight])
  end

  def create
    user = User.find_by(firebase_uid: params[:firebase_uid])
    # 既にユーザー登録済みの場合は新規登録をしない
    if user
      head :no_content
      return
    end

    user = User.new(user_params)
    if user.save
      head :created
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  def update
    user = User.find_by(firebase_uid: params[:firebase_uid])
    if user.update(user_params)
      render json: user.as_json(only: [:id, :weight])
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:firebase_uid, :name, :avatar, :weight)
  end
end
