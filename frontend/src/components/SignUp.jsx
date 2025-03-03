// コンポーネント
import { handleSignUp } from "../firebase/firebase";
import { api } from "../api";
// ライブラリ
import { useState } from "react";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  // ユーザー登録
  const createUserApi = async (e) => {
    e.preventDefault();
    const userCredential = await handleSignUp(email, password);
    const uid = await userCredential.user.uid;
    try {
      await api.post("/api/v1/users", {
        firebase_uid: uid,
        name: userName
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>新規登録</h2>
      <form onSubmit={createUserApi}>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
        <button type="submit">新規登録</button>
      </form>
    </div>
  );
}
