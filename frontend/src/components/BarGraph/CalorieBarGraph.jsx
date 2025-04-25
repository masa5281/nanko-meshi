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
import { CustomTick, CustomLegend } from './CommonGraph';

export const CalorieBarGraph = ({
  barData,
  selectColor,
  onClickGraph,
  ticks,
  dataKey,
}) => {
  return (
    <ResponsiveContainer width="100%" height={350} >
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
          dataKey={dataKey}
          tickSize={0}
          tickMargin={10}
          tick={<CustomTick selectColor={selectColor} />}
        />
        <YAxis
          ticks={ticks}
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
  );
};
