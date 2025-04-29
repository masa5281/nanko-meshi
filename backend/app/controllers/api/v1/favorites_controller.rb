class Api::V1::FavoritesController < ApplicationController
  def index
    favorites = current_user.favorited_foods
    render json: favorites
  end

  def create
    @favorite = current_user.favorites.create!(favorite_params)
    head :created
  end

  def destroy
  end

  private

  def favorite_params
    params.require(:favorite).permit(:food_id)
  end
end
