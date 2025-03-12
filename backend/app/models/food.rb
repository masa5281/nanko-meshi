class Food < ApplicationRecord
  belongs_to :user

  mount_uploader :food_image, FoodImageUploader
end
