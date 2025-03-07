// コンポーネント
import { auth } from "../firebase/firebase"
// ライブラリ
import { sendPasswordResetEmail } from "firebase/auth"
import { IconContext } from "react-icons/lib";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"
import { useNavigate } from "react-router-dom";
// アイコン
import { IoMail } from "react-icons/io5";

export const PasswordResetForm = () => {
  const navigate = useNavigate();

  const {
      register,
      watch,
      handleSubmit,
      formState: { errors },
    } = useForm({
      mode: "onBlur",
      criteriaMode: "all"
    });

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, watch("email"));
    navigate("/password_sent");
  }

  return (
    <div className="pt-12">
      <div className="max-w-md mx-auto px-10 py-6 bg-header rounded-md shadow-md shadow-shadow">
        <h2 className="mb-5 pb-2 border-b border-white text-white text-3xl text-center">パスワード再設定</h2>

        <div className="px-3">
          <p className="mb-3 text-white tracking-tight">
            登録済みのメールアドレスを入力してください。
            パスワード再設定のURLをメールで送信します。
          </p>

          <form onSubmit={handleSubmit(handlePasswordReset)}>
            <div className="relative">
              <input
                type="email"
                placeholder="メールアドレス"
                className="w-full py-2 border-none rounded-full indent-8 focus:ring-2 focus:ring-secondary focus:border-secondary"
                {...register("email", {
                  required: "メールアドレスを入力してください",
                  pattern: {
                    value: /^[a-zA-Z0-9_.-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                    message: "有効なメールアドレスを入力してください"
                  }
                })}
              />
              <div className="absolute top-1 left-1 p-1 rounded-full bg-text">
                <IconContext.Provider value={{ size: 24, color: "white" }}>
                  <IoMail />
                </IconContext.Provider>
              </div>
            </div>
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => message ? (<p className="text-errorYellow text-sm">{message}</p>) : null}
            />

            <button type="submit" className="inline-block w-full mt-4 py-1 border-2 border-white rounded-full bg-primary text-white text-xl hover:bg-hover">
              パスワード再設定メールを送信
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
