// コンポーネント
import { auth } from "../firebase/firebase"
// ライブラリ
import { sendPasswordResetEmail } from "firebase/auth"
import { useState } from "react"

export const PasswordResetForm = () => {
  const [email, setEmail] = useState("");

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email);
  }

  return (
    <div>
      <h2>パスワード再設定</h2>
      <p>
        登録済みのメールアドレスを入力してください。
        パスワード再設定用のURLをメールで送信します。
      </p>
      <form onSubmit={handlePasswordReset}>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">パスワード再設定メールを送信</button>
      </form>
    </div>
  )
}
