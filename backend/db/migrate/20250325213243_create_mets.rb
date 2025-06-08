class CreateMets < ActiveRecord::Migration[7.2]
  def change
    create_table :mets do |t|
      t.string :activity_name, null: false
      t.float :mets_value, null: false

      t.timestamps
    end
    add_index :mets, :activity_name, unique: true
  end
end
