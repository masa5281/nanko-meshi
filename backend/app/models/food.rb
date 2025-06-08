class Food < ApplicationRecord
  belongs_to :user
  has_many :favorites, dependent: :destroy
  has_many :favorited_users, through: :favorites, source: :user

  mount_uploader :food_image, FoodImageUploader

  validates :name, presence: true, length: { maximum: 20 }
  validates :calorie, presence: true, numericality: { only_integer: true, greater_than: 0, less_than: 10000 }
end
