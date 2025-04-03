// モジュール
import { ROUTES } from "../../utils/constants";
import { handleSignOut } from "../../config/firebase";
import { getUserApi } from "../../api/userApi";
// コンポーネント
import { IconList } from "./IconList";
// ライブラリ
import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { useEffect, useState } from "react";
// 画像
import fire from "../../images/fire-white.png"
import food from "../../images/food-white.png"
import graph from "../../images/graph-white.png"
import logo from "../../images/logo.png"
// アイコン
import { PiSignOutBold } from "react-icons/pi";
import { PiSignInBold } from "react-icons/pi";
import { BiSolidBowlRice } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
// flowbite-reactのカスタムテーマ
import { headerCustomTheme } from "../../theme/theme";
// カスタムフック
import { useAuth } from "../../context/AuthContext";
import { IconProvider } from "../IconProvider";

export const Header = () => {
  const [userImage, setUserImage] = useState("");
  const { user, isAuthReady } = useAuth();

  useEffect(() => {
    if (!user) return;

    const getUserData = async () => {
      try {
        const userData = await getUserApi(user.uid);
        setUserImage(userData.avatar.icon.url);
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, [user])

  return (
    <header className="flex items-center justify-between h-16 px-5 mb-8 bg-header shadow-sm shadow-shadow">
      <a href="/">
        <div className="w-48">
          <img src={logo} alt="ロゴ" className="w-full" />
        </div>
      </a>
      {isAuthReady && (
        user ? (
          <nav className="flex items-center h-full">
            <ul className="flex items-center h-full mr-4">
              <IconList link={ROUTES.CALORIE.INPUT} img={fire} alt={"カロリー入力"} menuName={"カロリー入力"} />
              <IconList link={ROUTES.FOODS.REGISTER} img={food} alt={"食品登録"} menuName={"食品登録"} />
              <IconList img={graph} alt={"総消費カロリー"} menuName={"総消費カロリー"} />
            </ul>
            <Dropdown label={
              <img src={userImage} alt="" className="" />
            }
              arrowIcon={false}
              inline={true}
              theme={headerCustomTheme}
            >
              <Link to={ROUTES.AUTH.SIGN_IN} onClick={handleSignOut}>
                <Dropdown.Item icon={PiSignOutBold}>ログアウト</Dropdown.Item>
              </Link>
              <Link to={ROUTES.USERS.ITEM}>
                <Dropdown.Item icon={BiSolidBowlRice}>登録した食品</Dropdown.Item>
              </Link>
              <Link to={ROUTES.USERS.PROFILE}>
                <Dropdown.Item icon={FaUser}>アカウント設定</Dropdown.Item>
              </Link>
            </Dropdown>
          </nav>
        ) : (
          <Link to={ROUTES.AUTH.SIGN_IN} className="flex flex-col items-center text-white font-bold hover:text-hoverWhite">
            <IconProvider size={26}>
              <PiSignInBold />
            </IconProvider>
            ログイン
          </Link>
        )
      )}
    </header>
  );
};
