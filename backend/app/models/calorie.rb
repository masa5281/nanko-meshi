class Calorie < ApplicationRecord
  validates :burned_calorie, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :recorded_at, presence: true
  validate :validate_not_future_date

  private

  def validate_not_future_date
    errors.add(:recorded_at, :not_future_date) if recorded_at.present? && recorded_at > Time.zone.today
  end
end
