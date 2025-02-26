class Food < ApplicationRecord
  mount_uploader :food_image, FoodImageUploader
end
