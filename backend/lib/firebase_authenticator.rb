module FirebaseAuthenticator
  require "jwt"
  require "net/http" # 外部URLとHTTP通信を行う用
  require "uri" # URLの操作用

  # 定数の設定
  ALG = "RS256" # 署名アルゴリズムの指定
  FIREBASE_PROJECT_ID = ENV.fetch("FIREBASE_PROJECT_ID") # プロジェクトIDに変更
  CERT_URI = "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com" # Firebaseの公開鍵にアクセス

  # IDトークンの検証
  def verify_id_token(token)
    return if token.blank?

    # Firebaseから公開鍵の取得
    certs = Rails.cache.fetch("firebase_jwks", expires_in: 1.hour) do
      uri = URI.parse(CERT_URI) # URLを解析してURIオブジェクトを作成
      response = Net::HTTP.get_response(uri) # HTTPリクエストを送信し、レスポンスを取得
      JSON.parse(response.body)
    end

    header = JWT.decode(token, nil, false)[1]
    kid = header["kid"]
    cert = certs[kid]
    # JWTの署名を検証するための公開鍵を取得
    public_key = OpenSSL::X509::Certificate.new(cert).public_key

    # JWTの検証（署名検証とペイロード抽出）
    payload, header = JWT.decode(token, public_key, true, {
      algorithm: ALG,
      iss: "https://securetoken.google.com/#{FIREBASE_PROJECT_ID}",
      verify_iss: true,
      aud: FIREBASE_PROJECT_ID,
      verify_aud: true
    })

    # UIDの抽出
    payload["sub"]

    # JWT.decodeの例外処理
    rescue => e
      Rails.logger.error "Firebase authentication failed: #{e.message}"
      nil
  end
end
