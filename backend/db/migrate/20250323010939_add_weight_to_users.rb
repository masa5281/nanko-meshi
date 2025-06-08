class AddWeightToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :weight, :integer, null: true
    add_check_constraint :users, "weight > 0", name: "greater_than_0"
  end
end
