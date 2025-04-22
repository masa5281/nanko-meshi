import { useEffect, useMemo, useState } from 'react';
import { useCalorieApi } from '../../hooks/useCalorieApi';
import { CalorieBarGraph } from './CalorieBarGraph';
import { PeriodNavigation } from './PeriodNavigation';

export const MonthGraph = () => {
  const { calorieList } = useCalorieApi();
  const [selectMonth, setSelectMonth] = useState(new Date());
  const [selectCalorie, setSelectCalorie] = useState("");
  const [barData, setBarData] = useState([]);
  const month = useMemo(() => ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], []);
  const [isCurrentYear, setIsCurrentYear] = useState(true);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();
  const [startYearDate, setStartYearDate] = useState(new Date(currentYear, 0, 1));

  const selectColor = (payload, truthyColor, falsyColor) => {
    return (selectMonth.getMonth() === payload.index) ? truthyColor : falsyColor;
  };

  // グラフ表示に合わせてフォーマット
  const formatGraphMonth = (date, index = 0) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + index);
    return `${newDate.getFullYear()}年${newDate.getMonth() + 1}月`;
  };

  // 何月分足すかを処理
  const onClickGraph = (data, index) => {
    const targetMonth = new Date(startYearDate);
    targetMonth.setMonth(targetMonth.getMonth() + index);
    setSelectMonth(targetMonth);
    setSelectCalorie(data.burnedCalorie);
  };

  useEffect(() => {
    const endYearDate = new Date(startYearDate.getFullYear(), 11, 31);
    const formatToday = new Date(currentYear, currentMonth, currentDate);
    setIsCurrentYear(formatToday >= startYearDate && formatToday <= endYearDate);
  }, [currentYear, currentMonth, currentDate, startYearDate]);

  // DBのカロリーを該当の月のグラフに配置
  useEffect(() => {
    const data = [];
    for (let i = 0; i < 12; i++) {
      const baseDate = new Date(startYearDate);
      baseDate.setMonth(baseDate.getMonth() + i);
      const dateStr = `${baseDate.getFullYear()}-${String(baseDate.getMonth() + 1).padStart(2, "0")}`;
      const newCalorieList = calorieList.filter(calorie => calorie.recorded_at.slice(0, 7) === dateStr);
      const sumCalorie = newCalorieList.reduce((totalCalorie, object) => totalCalorie + object.burned_calorie, 0);
      if (i === selectMonth.getMonth()) {
        setSelectCalorie(sumCalorie);
      }
      data.push({
        month: month[i],
        burnedCalorie: sumCalorie
      })
    }
    setBarData(data);
  }, [startYearDate, calorieList, selectMonth, month]);

  const onPrevYear = () => {
    const prevYearDate = new Date(startYearDate.getFullYear() - 1, 0, 1);
    setStartYearDate(prevYearDate);
    setSelectMonth(prevYearDate);
  };

  const onNextYear = () => {
    const nextYearDate = new Date(startYearDate.getFullYear() + 1, 0, 1);
    setStartYearDate(nextYearDate);
    setSelectMonth(nextYearDate);
  };

  return (
    <>
      <p className='inline-block mb-2 border-b-2 border-black text-xl'>{formatGraphMonth(selectMonth)}</p>
      <p className='text-primary text-5xl font-bold'>{selectCalorie}<span className='text-black text-xl'>kcal</span></p>

      <CalorieBarGraph
        key={selectMonth}
        barData={barData}
        selectColor={selectColor}
        onClickGraph={onClickGraph}
        ticks={[2000, 4000, 6000, 8000, 10000]}
        dataKey="month"
      />

      <PeriodNavigation
        isCurrentState={isCurrentYear}
        onPrev={onPrevYear}
        onNext={onNextYear}
        prevText="前年"
        nextText="翌年"
      />
    </>
  );
};
