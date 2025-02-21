CarrierWave.configure do |config|
  # 画像のURLにRailsサーバーのホスト名を追加
  config.asset_host = "http://localhost:3000"
end
