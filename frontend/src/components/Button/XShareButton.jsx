import { ROUTES } from "../../utils/constants";
import { TwitterShareButton, XIcon } from "react-share";

export const XShareButton = ({ food, foodCount }) => {
  return (
    <TwitterShareButton
      url={`${process.env.REACT_APP_BASE_URL}${ROUTES.TOP}`}
      title={`【今日の運動成果】\n${food.name} ${foodCount}個分のカロリーを消費！🔥\n\n#なんこメシ\n#ダイエット`}
      className="absolute top-3 right-3"
    >
      <XIcon size={20} round={true} />
    </TwitterShareButton>
  );
};
