import { ROUTES } from "../../utils/constants";
import { TwitterShareButton, XIcon } from "react-share";

export const XShareButton = ({ food, foodCount }) => {
  return (
    <TwitterShareButton
      url={`${process.env.REACT_APP_DEV_URL}${ROUTES.AUTH.SIGN_IN}`}
      title={`今日の運動成果：${food.name} ${foodCount}個分のカロリーを消費！🔥\n#なんこメシ #ダイエット`}
      className="absolute top-3 right-3"
    >
      <XIcon size={20} round={true} />
    </TwitterShareButton>
  );
};
