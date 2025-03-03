// ライブラリ
import { useState } from "react";
import { auth, handleSignIn, handleSignOut, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState(auth);

  const signIn = async (e) => {
    e.preventDefault();
    await handleSignIn(email, password);
  };

  const handleSignInGoogle = () => {
    signInWithPopup(auth, provider);
  }

  return (
    <div>
      <h2>ログイン</h2>
      <form onSubmit={signIn}>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">ログイン</button>
      </form>
      { user ? (
        <>
          <p>ログイン済み</p>
        </>
      ) : 
        <button onClick={handleSignInGoogle}>Googleでログイン</button>
      }
      <button type="button" onClick={handleSignOut}>ログアウト</button>
    </div>
  );
}
