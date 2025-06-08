# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# 開発者
User.find_or_create_by!(firebase_uid: ENV.fetch("DEVELOPER_FIREBASE_UID")) do |u|
  u.name = "開発者"
  u.avatar = nil
  u.weight = 70
end

# Metsの運動項目
activities = [
  {
    activity_name: "ウォーキング（3.2km/h・18分45秒/km）",
    mets_value: "2.0"
  },
  {
    activity_name: "ウォーキング（4.8km/h・12分30秒/km）",
    mets_value: "3.5"
  },
  {
    activity_name: "ウォーキング（6.4km/h・9分23秒/km）",
    mets_value: "5.0"
  },
  {
    activity_name: "ジョギング（6.4km/h・9分23秒/km）",
    mets_value: "6.0"
  },
  {
    activity_name: "ジョギング（8km/h・7分30秒/km）",
    mets_value: "7.0"
  },
  {
    activity_name: "ジョギング（8.6km/h・6分59秒/km）",
    mets_value: "7.4"
  },
  {
    activity_name: "ジョギング（9.2km/h・6分31秒/km）",
    mets_value: "7.8"
  },
  {
    activity_name: "ランニング（10km/h・6分/km）",
    mets_value: "8.3"
  },
  {
    activity_name: "ランニング（10.8km/h・5分33秒/km）",
    mets_value: "11.0"
  },
  {
    activity_name: "ランニング（14.5km/h・4分08秒/km）",
    mets_value: "15.0"
  },
  {
    activity_name: "ヨガ・ストレッチ",
    mets_value: "2.5"
  },
  {
    activity_name: "筋トレ（腹筋、腕立て伏せ、スクワット等）",
    mets_value: "3.5"
  },
  {
    activity_name: "筋トレ（ベンチプレス、デッドリフト等）",
    mets_value: "6.0"
  }
]
activities.each do |acticity|
  Met.find_or_create_by!(**acticity)
end
