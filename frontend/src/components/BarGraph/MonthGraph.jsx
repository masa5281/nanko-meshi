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

      <ResponsiveContainer className={""} width="100%" height={350} >
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
            dataKey="month"
            tickSize={0}
            tickMargin={10}
            tick={<CustomTick selectColor={selectColor} />}
          />
          <YAxis
            ticks={[2000, 4000, 6000, 8000, 10000]}
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
          onClick={onPrevYear}
        >
          前週
        </button>
        <button
          className={`${isCurrentYear ? "text-gray-400 pointer-events-none before:border-gray-400" : null} relative mr-4 before:content-[''] before:absolute before:top-2.5 before:-right-3 before:w-3 before:h-3 before:border-t-2 before:border-l-2 before:border-black before:rotate-[135deg]`}
          onClick={onNextYear}
        >
          翌週
        </button>
      </div>
    </>
  );
};
