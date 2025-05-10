// モジュール
import { ROUTES } from "../utils/constants";
// ライブラリ
import { Link } from "react-router-dom";
import { motion } from "motion/react"
// 画像読み込み
import keyLogoDesktop from "../images/key-pc-logo.png"
import keyBgDesktop from "../images/key-pc-bg.png"
import defaultIcon from "../images/default-icon.jpg"
import iPhoneInput from "../images/iPhone-13-Pro-input.png"
import iPhoneConversion from "../images/iPhone-13-Pro-conversion.png"
import iPhoneRegistration from "../images/iPhone-13-Pro-registration.png"
import iPhoneFavorite from "../images/iPhone-13-Pro-favorite.png"

export const TopPage = () => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const ProcessStep = ({
    title,
    img,
    alt,
    description
  }) => {
    return (
      <li className="max-w-80 p-6 bg-[#FFDD79] rounded-md shadow-sm shadow-shadow">
        <h3 className="inline-block mb-5 px-3 py-1 bg-primary rounded-full text-2xl text-background">{title}</h3>
        <img src={img} alt={alt} className="mb-5" />
        <p className="text-left">{description}</p>
      </li>
    );
  };

  const UserProblem = ({
    flexClass,
    initialX,
    side,
    children,
  }) => {
    return (
      <div className="flex justify-center items-center mb-8">
        <div className={`${flexClass} ${side === "left" ? "-translate-x-48" : "translate-x-48"} flex `}>
          <div>
            <img src={defaultIcon} alt="" className="max-w-20 rounded-full shadow-md shadow-shadow" />
          </div>
          <motion.div
            className="drop-shadow-md"
            initial={{ x: initialX, scale: 0 }}
            whileInView={{ x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <p
              className={`${side === "left" ? "left-10 after:-left-4 after:border-r-[30px]" : "right-10 after:-right-4 after:border-l-[30px]"}
              relative inline-block p-4 bg-white text-lg rounded-md
              after:content-[''] after:absolute after:top-4 after:-z-10 after:border-t-transparent after:border-b-transparent
              after:border-t-[30px] after:border-b-[30px] after:border-white` }
            >
              {children}
            </p>
          </motion.div>
        </div>
      </div>
    );
  };

  const FoodConversionItem = ({
    text,
    foodName,
    countText,
  }) => {
    return (
      <motion.li
        className="max-w-80 w-full mr-4 p-3 text-xl bg-white rounded-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
        transition={{ duration: 0.8 }}
      >
        <p className="mb-2">{text}</p>
        <p className="text-2xl">{foodName}<span className="text-primary text-3xl font-bold">{countText}</span></p>
      </motion.li>
    );
  };

  return (
    <>
      <section
        style={{ backgroundImage: `url(${keyBgDesktop})` }}
        className="relative -z-10 flex justify-center items-center h-[600px] mb-10 bg-no-repeat bg-cover bg-center"
      >
        <div className="max-w-lg">
          <img src={keyLogoDesktop} alt="ロゴ画像" className="w-full" />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-12 text-4xl font-bold text-center">こんなお悩みありませんか？</h2>
        <UserProblem flexClass={"flex-row"} initialX={-200} side={"left"}>
          運動をしてカロリーを消費したけど、<br /><span className="text-xl font-bold">イマイチ達成感がないかも？</span>
        </UserProblem>
        <UserProblem flexClass={"flex-row-reverse"} initialX={200} side={"right"}>
          この努力、<br /><span className="text-xl font-bold">もっと別の“何か”で評価されたい！</span>
        </UserProblem>
      </section>

      <section className="mb-12">
        <div className="max-w-6xl mx-auto p-8 bg-primary rounded-md text-white text-center shadow-sm shadow-shadow">
          <h2 className="mb-5 text-3xl">あなたの消費カロリー、<span className="text-5xl text-[#ffff00]">食べ物<span className="text-3xl">の</span>個数</span>で置き換えてみませんか？</h2>
          <p className="mb-5 text-xl">「なんこメシ」は運動で消費したカロリーを食品の個数に換算できます。</p>
          <div>
            <p className="mb-3 text-3xl -tracking-widest">例えば<span className="-tracking-[0.5em]">・・・</span></p>
            <ul className="flex justify-center text-black drop-shadow-md">
              <FoodConversionItem text={"ランニングで消費した400kcal"} foodName={"ポテチ"} countText={"1.4個分"} />
              <FoodConversionItem text={"筋トレで消費した100kcal"} foodName={"アイス"} countText={"0.5個分"} />
              <FoodConversionItem text={"ヨガで消費した200kcal"} foodName={"ラーメン"} countText={"0.4個分"} />
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12 bg-">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="inline-block mb-8 pb-2 text-4xl border-b-2 border-black font-bold">アプリの主な使い方</h2>
          <ul className="flex gap-8">
            <ProcessStep
              title={"カロリー入力"}
              img={iPhoneInput}
              alt={"カロリー入力ページが表示されたiPhone13"}
              description={"運動による消費カロリーと日付を入力。カロリー不明な場合はMETsから推定値を算出できます。"}
            />
            <ProcessStep
              title={"食品個数に換算"}
              img={iPhoneConversion}
              alt={"換算結果ページが表示されたiPhone13"}
              description={"カロリー入力後、あなたが消費したカロリーが食品の個数に換算されます。"}
            />
            <ProcessStep
              title={"食品登録"}
              img={iPhoneRegistration}
              alt={"食品ページが表示されたiPhone13"}
              description={"自分がよく食べる食品を登録して、個数換算の対象にできます。"}
            />
            <ProcessStep
              title={"お気に入り機能"}
              img={iPhoneFavorite}
              alt={"お気に入りページが表示されたiPhone13"}
              description={"他のユーザーが登録している食品をお気に入り登録して、個数換算の対象にできます。"}
            />
          </ul>
        </div>
      </section>

      <footer className="py-8 bg-[#FFFAF0]">
        <nav className="mb-4">
          <ul className="flex gap-4 justify-center text-sm">
            <li><Link to={ROUTES.TERMS}>利用規約</Link></li>
            <li><Link to={ROUTES.PRIVACY}>プライバシーポリシー</Link></li>
          </ul>
        </nav>
        <div className="flex justify-center items-center gap-3">
          <small className="text-sm">&copy; 2025 なんこメシ</small>
          <Link to={"https://x.com/maaasaaayk"}>
            <svg width="15" height="15" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="black" />
            </svg>
          </Link>
          <Link to={"https://github.com/masa5281/nanko-meshi"}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="18" height="18">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
          </Link>
        </div>
      </footer>
    </>
  );
};
