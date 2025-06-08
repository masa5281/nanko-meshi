import { Link } from "react-router-dom";

export const Page404 = () => {

  return (
    <div className="mt-6 text-center">
      <h2 className="mb-3 text-4xl">404 Not Found</h2>
      <p className="mb-5">お探しのページは見つかりませんでした</p>
      <Link
        to={"/"}
        className="inline-block relative mx-auto px-[54px] py-2 border-black border-2 rounded-full bg-primary text-white font-bold hover:bg-hover"
      >
        トップページへ戻る
      </Link>
    </div>
  );
};
