const month = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
export const week = ["月", "火", "水", "木", "金", "土", "日"];

// DBのカロリーデータからグラフを生成
export const buildBarData = (baseDate, calorieList, graphType) => {
  const data = [];
  const isWeekly = graphType === "weekly";

  for (let i = 0; i < (isWeekly ? 7 : 12); i++) {
    const currentDate = new Date(baseDate);
    let newCalorieList = [];
    if (isWeekly) {
      currentDate.setDate(currentDate.getDate() + i)
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
      newCalorieList = calorieList.filter(calorie => calorie.recorded_at === dateStr)
    } else {
      currentDate.setMonth(currentDate.getMonth() + i);
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}`;
      newCalorieList = calorieList.filter(calorie => calorie.recorded_at.slice(0, 7) === dateStr);
    }
    const sumCalorie = newCalorieList.reduce((totalCalorie, object) => totalCalorie + object.burned_calorie, 0);
    data.push({
      dataLabel: isWeekly ? week[i] : month[i],
      burnedCalorie: sumCalorie
    })
  }
  return data;
};
