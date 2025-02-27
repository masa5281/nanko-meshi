import { useState } from "react";
import { handleSignIn, handleSignOut } from "../firebase/firebase";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * JSDocで変数eの型を明記
   * @param {Event} e 
   */
  const signIn = async (e) => {
    e.preventDefault();
    const user = await handleSignIn(email, password);
    console.log("サインインUser情報:", user);
  };

  return (
    <div>
      <h2>ログイン</h2>
      <form onSubmit={signIn}>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">ログイン</button>
      </form>
      <button type="button" onClick={handleSignOut}>ログアウト</button>
    </div>
  );
}
