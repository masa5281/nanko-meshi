import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, loading] = useAuthState(auth);
  // 認証準備完了の状態
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    if (!loading) setIsAuthReady(true)
  }, [loading])

  return (
    <AuthContext.Provider value={{user, loading, isAuthReady}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
