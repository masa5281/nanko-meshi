class Api::V1::UsersController < ApplicationController
  before_action :set_user
  skip_before_action :authenticate_request, only: %i[create]

  def show
    render json: @user.as_json(only: [:id, :name, :avatar, :weight])
  end

  def create
    if @user.present?
      head :no_content
      return
    end

    @user = User.new(user_params)
    if @user.save
      head :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
      render json: @user.as_json(only: [:id, :weight])
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @user.destroy
      head :no_content
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:firebase_uid, :name, :avatar, :weight)
  end

  def set_user
    begin
      @user = User.find_by!(firebase_uid: params[:firebase_uid])
    rescue ActiveRecord::RecordNotFound
      if action_name == "create"
        @user = nil
      else
        head :no_content
        return
      end
    end
  end
end
