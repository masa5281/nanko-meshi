class ApplicationController < ActionController::API
  include FirebaseAuthenticator

  # リクエスト毎に認証をチェック
  before_action :authenticate_request

  private

  # リクエストを認証
  def authenticate_request
    id_token = request.headers["Authorization"]&.split("Bearer ")&.last
    firebase_uid = verify_id_token(id_token)

    if firebase_uid
      @current_user = User.find_by(firebase_uid: firebase_uid)
    else
      render json: { error: "許可されていません" }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end
end
