# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2025_03_15_061652) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "calories", force: :cascade do |t|
    t.integer "burned_calorie", null: false
    t.date "recorded_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_calories_on_user_id"
  end

  create_table "foods", force: :cascade do |t|
    t.string "name", limit: 20, null: false
    t.integer "calorie", null: false
    t.string "food_image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_foods_on_user_id"
    t.check_constraint "calorie > 0 AND calorie < 10000", name: "calorie_check"
  end

  create_table "users", force: :cascade do |t|
    t.string "firebase_uid", null: false
    t.string "name", null: false
    t.string "avatar"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "calories", "users"
  add_foreign_key "foods", "users"
end
