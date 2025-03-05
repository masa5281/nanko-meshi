// コンポーネント
import { signUp } from "../firebase/firebase";
import { api } from "../api";
// ライブラリ
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"

export const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger
  } = useForm({
    mode: "onBlur",
    criteriaMode: "all"
  });

  // ユーザー登録
  const handleSignUp = async () => {
    const userCredential = await signUp(watch("email"), watch("password"));
    const uid = await userCredential.user.uid;
    try {
      await api.post("/api/v1/users", {
        firebase_uid: uid,
        name: watch("name")
      });
      navigate("/calorie/input");
    } catch (error) {
      console.log(error);
    }
  }

  const handleSignInGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/calorie/input");
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>新規登録</h2>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <input type="text" placeholder="ユーザー名" {...register("name")} />
        <input type="text" placeholder="メールアドレス" {...register("email")} />
        <input type="password" placeholder="パスワード" {...register("password", {
          onBlur: () => {
            if (getValues("password_confirm")) {
              trigger("password_confirm");
            }
          }
        })} />
        <input type="password" placeholder="パスワード（確認）"  {...register("password_confirm", {
          validate: (value) => value === getValues("password") || "パスワードが一致しません"})} />
        <ErrorMessage
          errors={errors}
          name="password_confirm"
          render={({ message }) => message ? (<p>{message}</p>) : null}
        />
        <button type="submit">新規登録</button>
      </form>
      <button onClick={handleSignInGoogle}>Googleで登録</button>
    </div>
  );
}
