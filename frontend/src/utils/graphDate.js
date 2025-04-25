const today = new Date();
const currentDate = today.getDate();

export const currentDayNum = today.getDay();
export const currentYear = today.getFullYear();
export const currentMonth = today.getMonth();
export const mondayDate = currentDayNum === 0 ? currentDate - 6 : currentDate - currentDayNum + 1;
export const formatToday = new Date(currentYear, currentMonth, currentDate);

// グラフ表示に合わせてフォーマット
export const formatGraph = (date, graphType) => {
  const formatDate = new Date(date);
  if (graphType === "week") {
    return `${formatDate.getFullYear()}年${formatDate.getMonth() + 1}月${formatDate.getDate()}日`;
  } else if (graphType === "month") {
    return `${formatDate.getFullYear()}年${formatDate.getMonth() + 1}月`;
  }
};

// 開始日のDateオブジェクトをフォーマット
export const formatStartDate = (startDate) => {
  const date = `${startDate.getFullYear()}年${startDate.getMonth() + 1}月${startDate.getDate()}日`;
  return date;
};

// 開始日からの日数を加算
export const addDays = (startDate, dateNum) => {
  const date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + dateNum);
  return date;
};

// 開始日からの年数を加算
export const addYears = (startYearDate, yearNum) => {
  const date = new Date(startYearDate.getFullYear() + yearNum, 0, 1);
  return date;
};

// 指定の期間内か判定
export const isDateInRange = (targetDate, startDate, endDate) => {
  return (targetDate >= startDate && targetDate <= endDate);
};

// 指定期間の最終日を取得
export const getGraphEndDate = (targetDate, graphType) => {
  const isWeekly = graphType === "weekly";
  if (isWeekly) {
    const endDate = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate() + 6);
    return endDate;
  } else {
    const endDate = new Date(targetDate.getFullYear(), 11, 31);
    return endDate;
  }
};
