class AddUserIdToCalories < ActiveRecord::Migration[7.2]
  def change
    add_reference :calories, :user, null: false, foreign_key: true
  end
end
