class CreateCalories < ActiveRecord::Migration[7.2]
  def change
    create_table :calories do |t|
      t.integer :burned_calorie, null: false
      t.date :recorded_at
      t.timestamps
    end
  end
end
