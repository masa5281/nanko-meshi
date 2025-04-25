class Api::V1::FavoritesController < ApplicationController
  def create
    @favorite = current_user.favorites.create!(favorite_params)
    render json: @favorite
  end

  def destroy
  end

  private

  def favorite_params
    params.require(:favorite).permit(:food_id)
  end
end
