class AddCheckConstraintToUsers < ActiveRecord::Migration[7.2]
  def change
    add_check_constraint :users, "weight > 19 AND weight < 151", name: "weight_check"
  end
end
