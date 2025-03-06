class User < ApplicationRecord
  validates :firebase_uid, presence: true, uniqueness: true
  validates :name, presence:, uniqueness: true, length: { maximum:20 }
end
