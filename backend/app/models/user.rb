class User < ApplicationRecord
  mount_uploader :avatar, AvatarUploader

  validates :firebase_uid, presence: true, uniqueness: true
  validates :name, presence:, uniqueness: true, length: { maximum:20 }
end
