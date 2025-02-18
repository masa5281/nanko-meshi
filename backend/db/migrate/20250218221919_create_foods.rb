class CreateFoods < ActiveRecord::Migration[7.2]
  def change
    create_table :foods do |t|
      t.string :name, null: false
      t.integer :calorie, null: false
      t.string :food_image, null: false

      t.timestamps
      t.check_constraint "calorie > 0", name: "greater_than_0"
    end
  end
end
