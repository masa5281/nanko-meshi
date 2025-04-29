class Api::V1::FavoritesController < ApplicationController
  def index
    favorites = current_user.favorited_foods
    render json: favorites
  end

  def create
    favorite = current_user.favorites.new(favorite_params)
    if favorite.save
      head :created
    else
      render json: favorite.errors, status: :unprocessable_entity
    end
  end

  def destroy
    favorite = current_user.favorites.find_by(food_id: params[:food_id])
    if favorite
      favorite.destroy
      head :no_content
    else
      render json: favorite.errors, status: :not_found
    end
  end

  private

  def favorite_params
    params.require(:favorite).permit(:food_id)
  end
end
