// モジュール
import { ROUTES } from '../../utils/constants';
import { buildBarData, week } from '../../utils/graphData';
import {
  addDays,
  currentMonth,
  currentYear,
  formatGraph,
  formatStartDate,
  formatToday,
  getGraphEndDate,
  isDateInRange,
  mondayDate
} from '../../utils/graphDate';
// コンポーネント
import { CalorieBarGraph } from './CalorieBarGraph';
import { PeriodNavigation } from './PeriodNavigation';
// ライブラリ
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const WeekGraphContent = ({ calorieList }) => {
  const [selectDate, setSelectDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date(currentYear, currentMonth, mondayDate));
  const [barData, setBarData] = useState(buildBarData(startDate, calorieList, "weekly"));
  const endDate = getGraphEndDate(startDate, "weekly");
  const isCurrentWeek = isDateInRange(formatToday, startDate, endDate);
  const navigate = useNavigate();

  // 日曜日なら6に、それ以外は-1（インデックス番号はグラフラベル合わせ）
  const selectIndex = selectDate.getDay() === 0 ? 6 : selectDate.getDay() - 1;
  const selectCalorie = barData[selectIndex].burnedCalorie;

  const selectColor = (payload, truthyColor, falsyColor) => {
    const selectWeek = selectDate.getDay() === 0 ? "日" : week[selectDate.getDay() - 1];
    return (selectWeek === payload.value) ? truthyColor : falsyColor;
  };

  // インデックスに応じて対象日を加算
  const onClickGraph = (_, index) => {
    const addStartDate = new Date(startDate);
    addStartDate.setDate(addStartDate.getDate() + index);
    setSelectDate(addStartDate);
  };

  const onPrevWeek = () => {
    const prevWeekDate = addDays(startDate, -7);
    setStartDate(prevWeekDate);
    setSelectDate(prevWeekDate);
    setBarData(buildBarData(prevWeekDate, calorieList, "weekly"));
  };

  const onNextWeek = () => {
    const nextWeekDate = addDays(startDate, 7);
    setStartDate(nextWeekDate);
    setSelectDate(nextWeekDate);
    setBarData(buildBarData(nextWeekDate, calorieList, "weekly"));
  };

  const convertCalorieToFood = () => {
    navigate(ROUTES.FOODS.CONVERSION, {
      state: {
        burnedCalorie: selectCalorie
      }
    })
  };

  return (
    <>
      <p className='inline-block mb-2 border-b-2 border-black text-xl'>{formatGraph(selectDate, "week")}</p>
      <p className='mb-3 text-primary text-5xl font-bold'>{selectCalorie}<span className='text-black text-xl'>kcal</span></p>
      <button
        className='p-2 bg-primary rounded-md text-white'
        onClick={convertCalorieToFood}
      >
        食品個数換算へ
      </button>
      <p className='absolute top-[135px] right-8'>{formatStartDate(startDate)}週</p>
      <CalorieBarGraph
        key={startDate}
        barData={barData}
        selectColor={selectColor}
        onClickGraph={onClickGraph}
        ticks={[200, 400, 600, 800, 1000]}
        dataKey="dataLabel"
      />
      <PeriodNavigation
        isCurrentState={isCurrentWeek}
        onPrev={onPrevWeek}
        onNext={onNextWeek}
        prevText="前週"
        nextText="翌週"
      />
    </>
  )
};
