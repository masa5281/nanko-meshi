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

export const WeekGraph = () => {
  const { calorieList } = useCalorieApi();
  const [weekStartStr, setWeekStartStr] = useState("");
  const [selectDate, setSelectDate] = useState(new Date());
  const [selectCalorie, setSelectCalorie] = useState("");
  const [barData, setBarData] = useState([]);
  const [isCurrentWeek, setIsCurrentWeek] = useState(true);
  const week = ["月", "火", "水", "木", "金", "土", "日"];

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const date = today.getDate();
  const dayNum = today.getDay();
  const mondayDate = dayNum === 0 ? date - 6 : date - dayNum + 1;
  const [startDate, setStateDate] = useState(new Date(currentYear, currentMonth, mondayDate));
  const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 6);
  const formatToday = new Date(currentYear, currentMonth, date);

  const CustomizedTick = ({ x, y, payload }) => (
    <g transform={`translate(${x},${y})`}>
      <rect x={-17.5} y={-5} width={35} height={35} fill={selectRectColor(payload)} rx={100} ry={100} />
      <text x={0} y={13} dy={5} textAnchor="middle" fontSize={14} fill={selectTextColor(payload)}>
        {payload.value}
      </text>
    </g>
  );

  const selectRectColor = (payload) => {
    const selectWeek = selectDate.getDay() === 0 ? "日" : week[selectDate.getDay() - 1];
    return (selectWeek === barData[payload.index].day) ? "#FF3838" : "#f0f0f0";
  };

  const selectTextColor = (payload) => {
    const selectWeek = selectDate.getDay() === 0 ? "日" : week[selectDate.getDay() - 1];
    return (selectWeek === barData[payload.index].day) ? "#fff" : "#333";
  }

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
    const formatStartDate = () => `${startDate.getFullYear()}年${startDate.getMonth() + 1}月${startDate.getDate()}日`;
    setWeekStartStr(formatStartDate());
    setIsCurrentWeek(formatToday >= startDate && formatToday <= endDate);
  }, [startDate]);

  // DBのカロリーを該当の週のグラフに配置
  useEffect(() => {
    const data = [];
    const targetIndex = isCurrentWeek ? (dayNum === 0 ? 6 : dayNum - 1) : 0;

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
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
  }, [calorieList, startDate, weekStartStr, dayNum]);

  const onPrevWeek = () => {
    const prevWeekDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 7);
    setStateDate(prevWeekDate);
    setSelectDate(prevWeekDate);
  };

  const onNextWeek = () => {
    const nextWeekDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 7);
    setStateDate(nextWeekDate);
    setSelectDate(nextWeekDate);
  };


  return (
    <div className='max-w-5xl mx-auto bg-white'>
      <p>{selectDate ? formatGraphDate(selectDate) : formatGraphDate(today)}</p>
      <p>{selectCalorie}<span>kcal</span></p>
      <p>{weekStartStr}週</p>
      <button onClick={onPrevWeek}>前週</button>
      {!isCurrentWeek && (
        <button onClick={onNextWeek}>翌週</button>
      )}

      <ResponsiveContainer key={weekStartStr} width="100%" height={500} >
        <BarChart
          data={barData}
          barSize={50}
        >
          <XAxis
            dataKey="day"
            tickSize={0}
            tickMargin={10}
            tick={<CustomizedTick />}
          />
          <YAxis
            ticks={[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]}
            tickSize={0}
            tickMargin={10}
          />
          <Legend
            payload={[
              { value: "消費カロリー", type: "circle" }
            ]}
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
    </div>
  );
};
