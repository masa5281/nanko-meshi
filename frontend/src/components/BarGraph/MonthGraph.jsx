// モジュール
import { useCalorieApi } from '../../hooks/useCalorieApi';
import { currentYear, formatGraph, formatToday } from '../../utils/graphDate';
// コンポーネント
import { CalorieBarGraph } from './CalorieBarGraph';
import { PeriodNavigation } from './PeriodNavigation';
// ライブラリ
import { useEffect, useMemo, useState } from 'react';

export const MonthGraph = () => {
  const { calorieList } = useCalorieApi();
  const [selectMonth, setSelectMonth] = useState(new Date());
  const [selectCalorie, setSelectCalorie] = useState("");
  const [barData, setBarData] = useState([]);
  const [isCurrentYear, setIsCurrentYear] = useState(true);
  const [startYearDate, setStartYearDate] = useState(new Date(currentYear, 0, 1));
  const month = useMemo(() => ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], []);

  const selectColor = (payload, truthyColor, falsyColor) => {
    return (selectMonth.getMonth() === payload.index) ? truthyColor : falsyColor;
  };

  // インデックスに応じて対象月を加算
  const onClickGraph = (data, index) => {
    const targetMonth = new Date(startYearDate);
    targetMonth.setMonth(targetMonth.getMonth() + index);
    setSelectMonth(targetMonth);
    setSelectCalorie(data.burnedCalorie);
  };

  useEffect(() => {
    const endYearDate = new Date(startYearDate.getFullYear(), 11, 31);
    setIsCurrentYear(formatToday >= startYearDate && formatToday <= endYearDate);
  }, [startYearDate]);

  // DBのカロリーデータからグラフを生成
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
      <p className='inline-block mb-2 border-b-2 border-black text-xl'>{formatGraph(selectMonth, "month")}</p>
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
