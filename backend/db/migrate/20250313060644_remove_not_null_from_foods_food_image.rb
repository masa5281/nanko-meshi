class RemoveNotNullFromFoodsFoodImage < ActiveRecord::Migration[7.2]
  def up
    change_column_null :foods, :food_image, true
  end

  def down
    change_column_null :foods, :food_image, false
  end
end
