class FoodSerializer < ActiveModel::Serializer
  attributes :id, :name, :calorie, :food_image, :is_favorited
  belongs_to :user

  def is_favorited
    scope.favorites.exists?(food_id: object.id)
  end
end
