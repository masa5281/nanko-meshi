// ライブラリ
import { useState } from "react";
import { auth, handleSignIn, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    await handleSignIn(email, password);
  };

  const handleSignInGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch(error) {
      console.error(error);
    }
    navigate("/calorie/input");
  }

  return (
    <div>
      <h2>ログイン</h2>
      <form onSubmit={signIn}>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">ログイン</button>
      </form>
      <Link to={"/password_reset"}>パスワードをお忘れの方はこちら</Link>
      <Link to={"/sign_up"}>新規登録の方はこちら</Link>
      <button onClick={handleSignInGoogle}>Googleでログイン</button>
    </div>
  );
}
