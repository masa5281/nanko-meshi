class Calorie < ApplicationRecord
  validates :burned_calorie, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :recorded_at, presence: true
  validate :validate_not_future_day

  private

  def validate_not_future_day
    errors.add(:recorded_at, "には未来の日付を指定できません") if recorded_at.present? && recorded_at > Date.today
  end
end
