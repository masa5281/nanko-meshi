class UpdateCheckConstraintToFoods < ActiveRecord::Migration[7.2]
  def change
    remove_check_constraint :foods, name: "greater_than_0"
    add_check_constraint :foods, "calorie > 0 AND calorie < 10000", name: "calorie_check"
  end
end
