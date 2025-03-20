// ライブラリ
import { Progress } from "flowbite-react";
import { useEffect, useState } from "react";
import { useMotionValue, useMotionValueEvent, animate } from "motion/react";
// flowbite-reactのカスタムテーマ
import { progressCustomTheme } from "../../theme/theme";

// プログレスバーをアニメーション
export const AnimateProgress = (props) => {
  const { foodCalorie, foodPercentage } = props;

  const initialValue = useMotionValue(0);
  const [progressValue, setProgressValue] = useState(0);
  const progressColor = (foodCalorie) => (foodPercentage >= 100) ? "redBar" : "primaryLight";
  
  useMotionValueEvent(initialValue, "change", (latest) => {
    setProgressValue(Math.round(latest));
  })
  useEffect(() => {
    animate(initialValue, foodPercentage, { duration: 2 });
  }, [initialValue, foodCalorie, foodPercentage]);

  return (
    <Progress progress={progressValue} size="lgPlus" color={progressColor(foodCalorie)} className="bg-slate-200" theme={progressCustomTheme} />
  )
}
