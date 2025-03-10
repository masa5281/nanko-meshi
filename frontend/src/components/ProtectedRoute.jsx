// モジュール
import { auth } from "../firebase/firebase";
import { ROUTES } from "../utils/constants";
// ライブラリ
import { Navigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth";

// 未ログイン時、サインインへ遷移
export const ProtectedRoute = ({children}) => {
  const [user, loading] = useAuthState(auth);

  if (!loading) {
    return user ? children : <Navigate to={ROUTES.AUTH.SIGN_IN} />
  }
}
