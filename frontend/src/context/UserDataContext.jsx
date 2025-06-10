import { createContext, useContext, useEffect, useState } from "react"
import { getUserApi } from "../api/userApi";
import { useAuth } from "./AuthContext";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [dbUserData, setDbUserData] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      // ログアウト時にstateをリセット
      setDbUserData(null);
      return;
    }
    if (dbUserData) return;

    const getUser = async () => {
      try {
        const userData = await getUserApi(user.uid);
        setDbUserData(userData);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.log("新規登録時の404を回避");
          return;
        }
        console.error(error);
      }
    }
    getUser();
  }, [user])

  return (
    <UserDataContext.Provider value={{ dbUserData, setDbUserData }}>
      {children}
    </UserDataContext.Provider>
  )
};

export const useUserDataContext = () => useContext(UserDataContext);
