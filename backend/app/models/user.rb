class User < ApplicationRecord
  has_many :calories, dependent: :destroy
  has_many :foods, dependent: :destroy

  mount_uploader :avatar, AvatarUploader

  validates :firebase_uid, presence: true, uniqueness: true
  validates :name, presence:, uniqueness: true, length: { maximum:20 }
  validates :weight, numericality: { only_integer: true, greater_than: 19, less_than: 151 }, allow_nil: true
end
