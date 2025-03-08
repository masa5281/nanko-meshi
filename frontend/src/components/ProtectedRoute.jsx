import { Navigate } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

export const ProtectedRoute = ({children}) => {
  const [user, loading] = useAuthState(auth);

  if (!loading) {
    return user ? children : <Navigate to={"/sign_in"} />
  }
}
