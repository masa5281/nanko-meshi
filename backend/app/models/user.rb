class User < ApplicationRecord
  has_many :calories, dependent: :destroy
  has_many :foods, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :favorited_foods, through: :favorites, source: :food

  mount_uploader :avatar, AvatarUploader

  validates :firebase_uid, presence: true, uniqueness: true
  validates :name, presence: true, length: { maximum:20 }
  validates :weight, numericality: { only_integer: true, greater_than: 19, less_than: 151 }, allow_nil: true
end
