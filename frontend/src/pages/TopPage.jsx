// ライブラリ
import { motion } from "motion/react"
// 画像読み込み
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
      <li className="min-w-[180px] max-w-80 p-3 lg:p-6 bg-[#FFDD79] rounded-md shadow-sm shadow-shadow">
        <h3 className="inline-block mb-5 px-3 py-1 bg-primary rounded-full text-base lg:text-2xl text-background">{title}</h3>
        <img src={img} alt={alt} className="mb-5" />
        <p className="text-sm lg:text-base text-left">{description}</p>
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
        <div className={`${flexClass} ${side === "left" ? "-translate-x-5 md:-translate-x-36 lg:-translate-x-48" : "translate-x-3 md:translate-x-36 lg:translate-x-48"} flex items-center`}>
          <div>
            <img src={defaultIcon} alt="ユーザーアイコン" className="max-w-14 md:max-w-20 rounded-full shadow-md shadow-shadow" />
          </div>
          <motion.div
            className="drop-shadow-md"
            initial={{ x: initialX, scale: 0 }}
            whileInView={{ x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <p
              className={`${side === "left" ? "left-5 md:left-10 after:-left-2 md:after:-left-4 after:border-r-[15px] md:after:border-r-[30px]" : "right-5 md:right-10 after:-right-2 md:after:-right-4 after:border-l-[15px] md:after:border-l-[30px]"}
              relative inline-block p-4 bg-white text-xs md:text-lg rounded-md
              after:content-[''] after:absolute after:top-5 md:after:top-4 after:-z-10 after:border-t-transparent after:border-b-transparent
              after:border-t-[15px] md:after:border-t-[30px] after:border-b-[15px] md:after:border-b-[30px] after:border-white` }
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
        className="max-w-52 md:max-w-80 w-full p-3 text-xs lg:text-xl bg-white rounded-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
        transition={{ duration: 0.8 }}
      >
        <p className="mb-2">{text}</p>
        <p className="text-lg lg:text-2xl">{foodName}<span className="text-primary text-2xl lg:text-3xl font-bold">{countText}</span></p>
      </motion.li>
    );
  };

  return (
    <>
      <section
        className="relative -z-10 flex justify-center items-center h-[300px] md:h-[400px] lg:h-[600px] mb-10 bg-no-repeat bg-cover bg-center bg-keyMobile md:bg-keyDesktop"
      >
      </section>

      <section className="mb-10">
        <h2 className="mb-5 md:mb-12 text-2xl md:text-4xl font-bold text-center">こんなお悩みありませんか？</h2>
        <UserProblem flexClass={"flex-row"} initialX={-200} side={"left"}>
          運動をしてカロリーを消費したけど、<br /><span className="text-sm md:text-xl font-bold">イマイチ達成感がないかも？</span>
        </UserProblem>
        <UserProblem flexClass={"flex-row-reverse"} initialX={200} side={"right"}>
          この努力、<br /><span className="text-sm md:text-xl font-bold">もっと別の“何か”で評価されたい！</span>
        </UserProblem>
      </section>

      <section className="mb-12 px-8 md:px-10">
        <div className="max-w-6xl mx-auto p-4 lg:p-8 bg-primary rounded-md text-white text-center shadow-sm shadow-shadow">
          <h2 className="mb-5 text-lg md:text-xl lg:text-3xl">あなたの消費カロリー、<br className="block lg:hidden" />
            <span className="text-xl md:text-3xl lg:text-5xl text-[#ffff00]">食べ物<span className="text-lg md:text-xl lg:text-3xl">の</span>個数</span>で<br className="block md:hidden" />置き換えてみませんか？
          </h2>
          <p className="mb-5 text-base md:text-lg lg:text-xl">「なんこメシ」は運動で消費したカロリーを食品の個数に換算できます。</p>
          <div>
            <p className="mb-3 md:text-xl lg:text-3xl -tracking-widest">例えば<span className="-tracking-[0.5em]">・・・</span></p>
            <ul className="flex flex-col md:flex-row justify-center items-center gap-4 text-black drop-shadow-md">
              <FoodConversionItem text={"ランニングで消費した400kcal"} foodName={"ポテチ"} countText={"1.4個分"} />
              <FoodConversionItem text={"筋トレで消費した100kcal"} foodName={"アイス"} countText={"0.5個分"} />
              <FoodConversionItem text={"ヨガで消費した200kcal"} foodName={"ラーメン"} countText={"0.4個分"} />
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12 px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="inline-block mb-3 md:mb-5 lg:mb-8 pb-2 text-2xl lg:text-4xl border-b-2 border-black font-bold">
            アプリの主な使い方
          </h2>
          <ul className="flex gap-5 lg:gap-8 p-3 md:p-0 overflow-x-scroll md:overflow-x-visible">
            <ProcessStep
              title={"カロリー入力"}
              img={iPhoneInput}
              alt={"カロリー入力ページが表示されたiPhone13"}
              description={"運動による消費カロリーと日付を入力。カロリー不明な場合はMETsから推定値を算出できます。"}
            />
            <ProcessStep
              title={"個数に換算"}
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
              title={"お気に入り"}
              img={iPhoneFavorite}
              alt={"お気に入りページが表示されたiPhone13"}
              description={"他のユーザーが登録している食品をお気に入り登録して、個数換算の対象にできます。"}
            />
          </ul>
        </div>
      </section>
    </>
  );
};
