// コンポーネント
import { IconList } from "./IconList";
import { handleSignOut } from "../../firebase/firebase";
// ライブラリ
import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { Flowbite } from "flowbite-react";
// 画像インポート
import fire from "../../images/fire-white.png"
import food from "../../images/food-white.png"
import graph from "../../images/graph-white.png"
import userIcon from "../../images/user.png"
import logo from "../../images/logo.png"
// アイコン
import { PiSignOutFill } from "react-icons/pi";
// flowbite-reactのカスタムテーマ
import { customTheme } from "../../theme/theme";

export const Header = () => {
  return (
    <header className="flex items-center justify-between h-16 px-5 mb-8 bg-header shadow-sm shadow-shadow">
      <a href="/">
        <div className="w-48">
          <img src={logo} alt="ロゴ" className="w-full" />
        </div>
      </a>
      <nav className="flex items-center h-full">
        <ul className="flex items-center h-full mr-4">
          <IconList img={fire} alt={"カロリー入力"} menuName={"カロリー入力"} />
          <IconList img={food} alt={"食品登録"} menuName={"食品登録"} />
          <IconList img={graph} alt={"総消費カロリー"} menuName={"総消費カロリー"} />
        </ul>
        <Flowbite theme={{ theme: customTheme }}>
          <Dropdown label={<img src={userIcon} alt="user" className="w-12" />} arrowIcon={false} inline={true}>
            <Dropdown.Item icon={PiSignOutFill}>
              <Link to={"/sign_in"} onClick={handleSignOut}>ログアウト</Link>
            </Dropdown.Item>
          </Dropdown>
        </Flowbite>
      </nav>
    </header>
  );
}
