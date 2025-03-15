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

  const value = {
    user,
    loading,
    isAuthReady,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// コンテキストを使用するための関数
export const useAuth = () => useContext(AuthContext);
