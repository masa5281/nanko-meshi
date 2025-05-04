// モジュール
import { buildBarData } from '../../utils/graphData';
import {
  addYears,
  currentYear,
  formatGraph,
  formatToday,
  getGraphEndDate,
  isDateInRange
} from '../../utils/graphDate';
// コンポーネント
import { CalorieBarGraph } from './CalorieBarGraph';
import { PeriodNavigation } from './PeriodNavigation';
// ライブラリ
import { useState } from 'react';

export const MonthGraphContent = ({ calorieList }) => {
  const [startYearDate, setStartYearDate] = useState(new Date(currentYear, 0, 1));
  const [selectMonth, setSelectMonth] = useState(new Date());
  const [barData, setBarData] = useState(buildBarData(startYearDate, calorieList, "monthly"));
  const selectCalorie = barData[selectMonth.getMonth()].burnedCalorie;
  const endYearDate = getGraphEndDate(startYearDate, "monthly");
  const isCurrentYear = isDateInRange(formatToday, startYearDate, endYearDate);

  const selectColor = (payload, truthyColor, falsyColor) => {
    return (selectMonth.getMonth() === payload.index) ? truthyColor : falsyColor;
  };

  // インデックスに応じて対象月を加算
  const onClickGraph = (_, index) => {
    const targetMonth = new Date(startYearDate);
    targetMonth.setMonth(targetMonth.getMonth() + index);
    setSelectMonth(targetMonth);
  };

  const onPrevYear = () => {
    const prevYearDate = addYears(startYearDate, -1);
    const newBarData = buildBarData(prevYearDate, calorieList, "monthly");
    setStartYearDate(prevYearDate);
    setSelectMonth(prevYearDate);
    setBarData(newBarData);
  };

  const onNextYear = () => {
    const nextYearDate = addYears(startYearDate, 1);
    setStartYearDate(nextYearDate);
    setSelectMonth(nextYearDate);
    setBarData(buildBarData(nextYearDate, calorieList, "monthly"));
  };

  return (
    <>
      <p className='inline-block mb-2 border-b-2 border-black text-xl'>{formatGraph(selectMonth, "month")}</p>
      <p className='mb-3 text-primary text-5xl font-bold'>{selectCalorie}<span className='text-black text-xl'>kcal</span></p>
      <CalorieBarGraph
        key={startYearDate}
        barData={barData}
        selectColor={selectColor}
        onClickGraph={onClickGraph}
        ticks={[2000, 4000, 6000, 8000, 10000]}
        dataKey="dataLabel"
      />
      <p
        className="mb-3 md:mb-0 before:content-[''] before:inline-block before:w-4 before:h-4 before:mr-1 before:bg-primary before:rounded-full"
      >
        消費カロリー
      </p>
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
