class Food < ApplicationRecord
  belongs_to :user

  mount_uploader :food_image, FoodImageUploader

  validates :name, presence: true, length: { maximum:20 }
  validates :calorie, presence: true, numericality: { only_integer: true, greater_than: 0, less_than: 10000 }
end
