// コンポーネント
import { IconList } from "./IconList";
import { auth, handleSignOut } from "../../firebase/firebase";
import { api } from "../../api";
// ライブラリ
import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { Flowbite } from "flowbite-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
// 画像インポート
import fire from "../../images/fire-white.png"
import food from "../../images/food-white.png"
import graph from "../../images/graph-white.png"
import logo from "../../images/logo.png"
// アイコン
import { PiSignOutBold } from "react-icons/pi";
import { PiSignInBold } from "react-icons/pi";
// flowbite-reactのカスタムテーマ
import { customTheme } from "../../theme/theme";
import { IconContext } from "react-icons/lib";

export const Header = () => {
  const [user] = useAuthState(auth);
  const [userImage, setUserImage] = useState("");
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get(`/api/v1/users/${user.uid}`);
        setUserImage(response.data.avatar.icon.url);
      } catch (error) {
        console.error(error);
      }
    };
    if (user) getUser();
  }, [user])

  return (
    <header className="flex items-center justify-between h-16 px-5 mb-8 bg-header shadow-sm shadow-shadow">
      <a href="/">
        <div className="w-48">
          <img src={logo} alt="ロゴ" className="w-full" />
        </div>
      </a>
      {user ? (
        <nav className="flex items-center h-full">
          <ul className="flex items-center h-full mr-4">
            <IconList link={"/calorie/input"} img={fire} alt={"カロリー入力"} menuName={"カロリー入力"} />
            <IconList img={food} alt={"食品登録"} menuName={"食品登録"} />
            <IconList img={graph} alt={"総消費カロリー"} menuName={"総消費カロリー"} />
          </ul>
          <Flowbite theme={{ theme: customTheme }}>
            <Dropdown label={
                <img src={userImage} alt="" className="max-w-full max-h-full"/>
              }
              arrowIcon={false}
              inline={true}
            >
              <Dropdown.Item icon={PiSignOutBold}>
                <Link to={"/sign_in"} onClick={handleSignOut}>ログアウト</Link>
              </Dropdown.Item>
            </Dropdown>
          </Flowbite>
        </nav>
      ) : (
        <Link to={"/sign_in"} className="flex flex-col items-center text-white font-bold hover:text-hoverWhite">
          <IconContext.Provider value={{ size: 26 }}>
            <PiSignInBold />
          </IconContext.Provider>
          ログイン
        </Link>
      )
      }
    </header>
  );
}
