// ライブラリ
import { useEffect, useState } from "react";
import { auth, handleSignIn, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    await handleSignIn(email, password);
  };

  const handleSignInGoogle = () => {
    signInWithPopup(auth, provider);
  }

  useEffect(() => {
    if (user) { navigate("/calorie/input") };
  }, [user, navigate]);

  return (
    <div>
      <h2>ログイン</h2>
      <form onSubmit={signIn}>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">ログイン</button>
      </form>
      <button onClick={handleSignInGoogle}>Googleでログイン</button>
    </div>
  );
}
