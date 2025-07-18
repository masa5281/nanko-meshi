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

ActiveRecord::Schema[7.2].define(version: 2025_04_23_055606) do
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

  create_table "favorites", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "food_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["food_id"], name: "index_favorites_on_food_id"
    t.index ["user_id", "food_id"], name: "index_favorites_on_user_id_and_food_id", unique: true
    t.index ["user_id"], name: "index_favorites_on_user_id"
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

  create_table "mets", force: :cascade do |t|
    t.string "activity_name", null: false
    t.float "mets_value", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["activity_name"], name: "index_mets_on_activity_name", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "firebase_uid", null: false
    t.string "name", null: false
    t.string "avatar"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "weight"
    t.check_constraint "weight > 0", name: "greater_than_0"
    t.check_constraint "weight > 19 AND weight < 151", name: "weight_check"
  end

  add_foreign_key "calories", "users"
  add_foreign_key "favorites", "foods"
  add_foreign_key "favorites", "users"
  add_foreign_key "foods", "users"
end
