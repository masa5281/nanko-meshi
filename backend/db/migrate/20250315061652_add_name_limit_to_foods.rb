class AddNameLimitToFoods < ActiveRecord::Migration[7.2]
  def change
    change_column :foods, :name, :string, limit: 20
  end
end
