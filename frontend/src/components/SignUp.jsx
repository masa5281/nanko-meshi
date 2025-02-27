import { useState } from "react";
import { handleSignUp } from "../firebase/firebase";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * JSDocで変数eの型を明記
   * @param {Event} e 
   */
  const signUp = async (e) => {
    e.preventDefault();
    const user = await handleSignUp(email, password);
    console.log("User情報:", user);
  };

  return (
    <div>
      <h2>新規登録</h2>
      <form onSubmit={signUp}>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">新規登録</button>
      </form>
    </div>
  );
}
