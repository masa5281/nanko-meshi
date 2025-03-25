# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
user = User.find_or_create_by(firebase_uid: "rvo1lUXPXngy4gSKV94pQmoxCjh2") do |u|
  u.name = "開発者"
  u.avatar = nil
  u.weight = 70
end

food_names = [ "ポテトチップス うすしお味", "たけのこの里", "牛丼 並盛", "ハーゲンダッツ", "てりやきマックバーガー" ]
calories = [ 336, 383, 683, 240, 477 ]
food_names.each_with_index do |food_name, index|
  calorie = calories[index]
  user.foods.create!(
    name: food_name,
    calorie: calorie,
    food_image: nil
  )
end

activity_names = [
  "ウォーキング（ゆっくり）",
  "ウォーキング（普通）",
  "ウォーキング（速め）",
  "ジョギング（ゆっくり）",
  "ジョギング（普通）",
  "ジョギング（やや速め）",
  "ジョギング（速め）",
  "ランニング（ゆっくり）",
  "ランニング（普通）",
  "ランニング（速め）",
  "ヨガ・ストレッチ",
  "筋トレ（軽・中等度）腹筋、腕立て伏せ、スクワットなど",
  "筋トレ（高強度）ベンチプレス、デッドリフトなど"
]
mets_values = [
  2.0,
  3.5,
  5.0,
  6.0,
  7.0,
  7.4,
  7.8,
  8.3,
  11.0,
  15.0,
  2.5,
  3.5,
  6.0
]
activity_names.each_with_index do |activity_name, index|
  mets_value = mets_values[index]
  Met.create!(
    activity_name: activity_name,
    mets_value: mets_value
  )
end
