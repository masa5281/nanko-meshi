class Met < ApplicationRecord
  validates :activity_name, presence: true, uniqueness: true
  validates :mets_value, presence: true
end
