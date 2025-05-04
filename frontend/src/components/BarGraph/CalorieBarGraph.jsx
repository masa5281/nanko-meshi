import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { CustomTick } from './CommonGraph';

export const CalorieBarGraph = ({
  barData,
  selectColor,
  onClickGraph,
  ticks,
  dataKey,
  graphType,
}) => {
  return (
    <div className='mx-auto mb-6 overflow-x-scroll md:overflow-x-visible md:max-w-[900px]'>
      <div className={`${graphType === "week" ? "min-w-[500px]" : "min-w-[700px]"} md:min-w-full`}>
        <ResponsiveContainer width="100%" height={350} >
          <BarChart
            data={barData}
            barSize={40}
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
              className='mb-4'
            />
            <YAxis
              ticks={ticks}
              tickSize={0}
              tickMargin={10}
              axisLine={false}
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
    </div>
  );
};
