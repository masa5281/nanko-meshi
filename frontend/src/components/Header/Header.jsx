import { IconList } from "./IconList";

// 画像インポート
import fire from "../../images/fire-white.png"
import food from "../../images/food-white.png"
import graph from "../../images/graph-white.png"
import user from "../../images/user.png"
import logo from "../../images/logo.png"

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
          <IconList img={food} alt={"カロリー入力"} menuName={"カロリー入力"} />
          <IconList img={graph} alt={"総消費カロリー"} menuName={"総消費カロリー"} />
        </ul>
        <div>
          <a href="/" className="flex flex-col items-center p-1 bg-white rounded-full">
            <img src={user} alt="user" className="w-10" />
          </a>
        </div>
      </nav>
    </header>
  );
}
