// モジュール
import { useCalorieApi } from '../../hooks/useCalorieApi';
import { currentMonth, currentYear, formatGraph, formatToday, mondayDate } from '../../utils/graphDate';
// コンポーネント
import { CalorieBarGraph } from './CalorieBarGraph';
import { PeriodNavigation } from './PeriodNavigation';
// ライブラリ
import { useEffect, useMemo, useState } from 'react';

export const WeekGraph = () => {
  const { calorieList } = useCalorieApi();
  const [weekStartStr, setWeekStartStr] = useState("");
  const [selectDate, setSelectDate] = useState(new Date());
  const [selectCalorie, setSelectCalorie] = useState("");
  const [barData, setBarData] = useState([]);
  const [isCurrentWeek, setIsCurrentWeek] = useState(true);
  const [startDate, setStartDate] = useState(new Date(currentYear, currentMonth, mondayDate));
  const week = useMemo(() => ["月", "火", "水", "木", "金", "土", "日"], []);

  const selectColor = (payload, truthyColor, falsyColor) => {
    const selectWeek = selectDate.getDay() === 0 ? "日" : week[selectDate.getDay() - 1];
    return (selectWeek === payload.value) ? truthyColor : falsyColor;
  };

  // インデックスに応じて対象日を加算
  const onClickGraph = (data, index) => {
    const addStartDate = new Date(startDate);
    addStartDate.setDate(addStartDate.getDate() + index);
    setSelectDate(addStartDate);
    setSelectCalorie(data.burnedCalorie);
  };

  useEffect(() => {
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 6);
    const formatStartDate = () => `${startDate.getFullYear()}年${startDate.getMonth() + 1}月${startDate.getDate()}日`;
    setWeekStartStr(formatStartDate());
    setIsCurrentWeek(formatToday >= startDate && formatToday <= endDate);
  }, [startDate]);

  // DBのカロリーデータからグラフを生成
  useEffect(() => {
    const data = [];
    const targetIndex = selectDate.getDay() === 1 ? 0 : selectDate.getDay() - 1;

    for (let i = 0; i < 7; i++) {
      const baseDate = new Date(startDate);
      baseDate.setDate(startDate.getDate() + i);
      const dateStr = `${baseDate.getFullYear()}-${String(baseDate.getMonth() + 1).padStart(2, "0")}-${String(baseDate.getDate()).padStart(2, "0")}`;
      const newCalorieList = calorieList.filter(calorie => calorie.recorded_at === dateStr);
      const sumCalorie = newCalorieList.reduce((totalCalorie, object) => totalCalorie + object.burned_calorie, 0);
      if (i === targetIndex) {
        setSelectCalorie(sumCalorie);
      }
      data.push({
        day: week[i],
        burnedCalorie: sumCalorie
      })
    }
    setBarData(data);
  }, [calorieList, startDate, selectDate, week]);

  const onPrevWeek = () => {
    const prevWeekDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 7);
    setStartDate(prevWeekDate);
    setSelectDate(prevWeekDate);
  };

  const onNextWeek = () => {
    const nextWeekDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 7);
    setStartDate(nextWeekDate);
    setSelectDate(nextWeekDate);
  };

  return (
    <>
      <p className='inline-block mb-2 border-b-2 border-black text-xl'>{formatGraph(selectDate, "week")}</p>
      <p className='text-primary text-5xl font-bold'>{selectCalorie}<span className='text-black text-xl'>kcal</span></p>
      <p className='absolute top-[80px] right-8'>{weekStartStr}週</p>
      <CalorieBarGraph
        key={weekStartStr}
        barData={barData}
        selectColor={selectColor}
        onClickGraph={onClickGraph}
        ticks={[200, 400, 600, 800, 1000]}
        dataKey="day"
      />
      <PeriodNavigation
        isCurrentState={isCurrentWeek}
        onPrev={onPrevWeek}
        onNext={onNextWeek}
        prevText="前週"
        nextText="翌週"
      />
    </>
  );
};
