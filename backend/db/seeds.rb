# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
user = User.find_or_create_by(firebase_uid: "8NLjWFYNhWU5vvM0gyNfqAT4mnH2") do |u|
  u.name = "開発者"
  u.avatar = nil
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
