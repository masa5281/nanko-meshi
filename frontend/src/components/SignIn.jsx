// ライブラリ
import { auth, signIn, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"
import { useState } from "react";
// アイコン
import { IoMail } from "react-icons/io5";
import { IoMdLock } from "react-icons/io";

export const SignIn = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    criteriaMode: "all"
  });

  // ログイン（メアド、パスワード）
  const handleSignIn = async (e) => {
    try {
      await signIn(watch("email"), watch("password"));
      navigate("/calorie/input");
    } catch (error) {
      setErrorMessage("メールアドレスまたはパスワードが違います");
    }
  };
  
  // ログイン（Google）
  const handleSignInGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/calorie/input");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="pt-12">
      <div className="max-w-96 mx-auto px-10 py-6 bg-header rounded-md shadow-md shadow-shadow">
        <h2 className="mb-5 pb-2 border-b border-white text-white text-3xl text-center">ログイン</h2>

        <div className="px-3">
          <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col mb-4">
            {errorMessage && <p className="mb-3 text-errorYellow text-sm">{errorMessage}</p>}

            <div className="relative">
              <input
                type="email"
                placeholder="メールアドレス"
                className="w-full mb-4 py-2 border-none rounded-full indent-8 focus:ring-2 focus:ring-secondary focus:border-secondary"
                {...register("email", {
                  required: "メールアドレスを入力してください"
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

            <div className="relative">
              <input
                type="password"
                placeholder="パスワード"
                className="w-full mb-4 py-2 border-none rounded-full indent-8 focus:ring-2 focus:ring-secondary focus:border-secondary"
                {...register("password", {
                  required: "パスワードを入力してください"
                })}
              />
              <div className="absolute top-1 left-1 p-1 rounded-full  bg-text">
                <IconContext.Provider value={{ size: 24, color: "white" }}>
                  <IoMdLock />
                </IconContext.Provider>
              </div>
            </div>
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => message ? (<p className="text-errorYellow text-sm">{message}</p>) : null}
            />

            <button type="submit" className="inline-block py-1 border-2 border-white rounded-full bg-primary text-white text-xl hover:bg-hover">
              ログイン
            </button>
          </form>

          <div className="mb-5 text-center">
            <Link to={"/password_reset"} className="inline-flex mb-1 text-white hover:underline">パスワードをお忘れの方はこちら</Link>
            <Link to={"/sign_up"} className="inline-flex text-white hover:underline">新規登録の方はこちら</Link>
          </div>
          <button onClick={handleSignInGoogle} className="flex justify-center items-center gap-2 w-full py-2 bg-white rounded-full hover:bg-hoverWhite">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ display: "block" }} width={20} height={20}>
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            Googleでログイン
          </button>
        </div>
      </div>
    </div>
  );
}
