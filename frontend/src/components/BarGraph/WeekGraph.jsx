import { useEffect, useMemo, useState } from 'react';
import {
  BarChart,
  Bar,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useCalorieApi } from '../../hooks/useCalorieApi';
import { CustomTick, CustomLegend } from './CommonGraph';

export const WeekGraph = () => {
  const { calorieList } = useCalorieApi();
  const [weekStartStr, setWeekStartStr] = useState("");
  const [selectDate, setSelectDate] = useState(new Date());
  const [selectCalorie, setSelectCalorie] = useState("");
  const [barData, setBarData] = useState([]);
  const [isCurrentWeek, setIsCurrentWeek] = useState(true);
  const week = useMemo(() => ["月", "火", "水", "木", "金", "土", "日"], []);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();
  const currentDayNum = today.getDay();
  const mondayDate = currentDayNum === 0 ? currentDate - 6 : currentDate - currentDayNum + 1;
  const [startDate, setStartDate] = useState(new Date(currentYear, currentMonth, mondayDate));

  const selectColor = (payload, truthyColor, falsyColor) => {
    const selectWeek = selectDate.getDay() === 0 ? "日" : week[selectDate.getDay() - 1];
    return (selectWeek === payload.value) ? truthyColor : falsyColor;
  };

  // グラフ表示に合わせてフォーマット
  const formatGraphDate = (date, index = 0) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + index);
    return `${newDate.getFullYear()}年${newDate.getMonth() + 1}月${newDate.getDate()}日`;
  };

  // startDateに何日分足すかを処理
  const onClickGraph = (data, index) => {
    const addStartDate = new Date(startDate);
    addStartDate.setDate(addStartDate.getDate() + index);
    setSelectDate(addStartDate);
    setSelectCalorie(data.burnedCalorie);
  };

  useEffect(() => {
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 6);
    // 時刻を省いた今日の日付オブジェクト
    const formatToday = new Date(currentYear, currentMonth, currentDate);

    const formatStartDate = () => `${startDate.getFullYear()}年${startDate.getMonth() + 1}月${startDate.getDate()}日`;
    setWeekStartStr(formatStartDate());
    setIsCurrentWeek(formatToday >= startDate && formatToday <= endDate);
  }, [startDate, currentYear, currentMonth, currentDate]);

  // DBのカロリーで週データを生成
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
  }, [calorieList, startDate, weekStartStr, isCurrentWeek, selectDate, week]);

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
      <p className='inline-block mb-2 border-b-2 border-black text-xl'>{formatGraphDate(selectDate)}</p>
      <p className='text-primary text-5xl font-bold'>{selectCalorie}<span className='text-black text-xl'>kcal</span></p>
      <p className='absolute top-[80px] right-8'>{weekStartStr}週</p>

      <ResponsiveContainer className={""} key={weekStartStr} width="100%" height={350} >
        <BarChart
          data={barData}
          barSize={50}
          margin={{
            top: 10,
            right: 10,
            left: -10,
            bottom: 20,
          }}
        >
          <XAxis
            dataKey="day"
            tickSize={0}
            tickMargin={10}
            tick={<CustomTick selectColor={selectColor} />}
          />
          <YAxis
            ticks={[200, 400, 600, 800, 1000]}
            tickSize={0}
            tickMargin={10}
            axisLine={false}
          />
          <Legend
            content={<CustomLegend />}
            payload={[
              { value: "消費カロリー" }
            ]}
            wrapperStyle={{
              marginLeft: "60px",
              paddingTop: "25px",
            }}
          />
          <CartesianGrid stroke="#d0d0d0" vertical={false} />
          <Bar
            dataKey="burnedCalorie"
            fill="#FF6E2B"
            radius={[5, 5, 0, 0]}
            onClick={onClickGraph}
          >
            {barData.map((_, index) => (
              <Cell
                cursor="pointer"
                key={index}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className='mr-3 text-lg text-right'>
        <button
          className="relative mr-4 before:content-[''] before:absolute before:top-2.5 before:-left-3 before:w-3 before:h-3 before:border-t-2 before:border-l-2 before:border-black before:-rotate-45"
          onClick={onPrevWeek}
        >
          前週
        </button>
        <button
          className={`${isCurrentWeek ? "text-gray-400 pointer-events-none before:border-gray-400" : null} relative mr-4 before:content-[''] before:absolute before:top-2.5 before:-right-3 before:w-3 before:h-3 before:border-t-2 before:border-l-2 before:border-black before:rotate-[135deg]`}
          onClick={onNextWeek}
        >
          翌週
        </button>
      </div>
    </>
  );
};
