class AddUserIdToFoods < ActiveRecord::Migration[7.2]
  def change
    add_reference :foods, :user, null: false, foreign_key: true
  end
end
