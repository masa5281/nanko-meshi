// コンポーネント
import { auth } from "../firebase/firebase"
// ライブラリ
import { sendPasswordResetEmail } from "firebase/auth"
import { useState } from "react"
import { IconContext } from "react-icons/lib";
// アイコン
import { IoMail } from "react-icons/io5";

export const PasswordResetForm = () => {
  const [email, setEmail] = useState("");

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email);
  }

  return (
    <div className="pt-12">
      <div className="max-w-md mx-auto px-10 py-6 bg-header rounded-md">
        <h2 className="mb-5 pb-2 border-b border-white text-white text-3xl text-center">パスワード再設定</h2>

        <div className="px-3">
          <p className="mb-3 text-white tracking-tight">
            登録済みのメールアドレスを入力してください。
            パスワード再設定のURLをメールで送信します。
          </p>

          <form onSubmit={handlePasswordReset}>
            <div className="relative">
              <input
                type="text"
                placeholder="メールアドレス"
                className="w-full mb-4 py-2 border-none rounded-full indent-8 focus:ring-2 focus:ring-secondary focus:border-secondary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="absolute top-1 left-1 p-1 rounded-full bg-text">
                <IconContext.Provider value={{ size: 24, color: "white" }}>
                  <IoMail />
                </IconContext.Provider>
              </div>
            </div>

            <button type="submit" className="inline-block w-full py-1 border-2 border-white rounded-full bg-primary text-white text-xl hover:bg-hover">
              パスワード再設定メールを送信
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
