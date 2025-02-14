class Calorie < ApplicationRecord
  validates :burned_calorie, presence: true, numericality: { only_integer: true, greater_than: 0 }
end
