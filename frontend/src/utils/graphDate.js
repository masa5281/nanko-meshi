const today = new Date();
export const currentYear = today.getFullYear();
export const currentMonth = today.getMonth();
const currentDate = today.getDate();
const currentDayNum = today.getDay();
export const mondayDate = currentDayNum === 0 ? currentDate - 6 : currentDate - currentDayNum + 1;

// 時刻を省いた今日の日付オブジェクト
export const formatToday = new Date(currentYear, currentMonth, currentDate);

// グラフ表示に合わせてフォーマット
export const formatGraph = (date, type) => {
  const formatDate = new Date(date);
  if (type === "week") {
    return `${formatDate.getFullYear()}年${formatDate.getMonth() + 1}月${formatDate.getDate()}日`;
  } else if (type === "month") {
    return `${formatDate.getFullYear()}年${formatDate.getMonth() + 1}月`;
  }
};
