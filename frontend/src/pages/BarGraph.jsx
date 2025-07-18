import { useState } from "react";
import { GraphLabel } from "../components/BarGraph/GraphLabel";
import { MonthGraph } from "../components/BarGraph/MonthGraph";
import { WeekGraph } from "../components/BarGraph/WeekGraph";

export const BarGraph = () => {
  const [graphType, setGraphType] = useState("week");

  return (
    <div className="max-w-7xl mx-auto mt-8 px-5 text-center">
      <h2 className="inline-block mb-8 px-5 py-3 bg-black rounded-full text-white text-xl md:text-3xl">消費カロリーの推移</h2>
      <div className="flex gap-4 max-w-5xl mx-auto">
        <GraphLabel labelName={"月"} graphName={"month"} graphType={graphType} setGraphType={setGraphType} />
        <GraphLabel labelName={"週"} graphName={"week"} graphType={graphType} setGraphType={setGraphType} />
      </div>
      <div className='relative max-w-5xl mx-auto px-5 py-5 bg-white rounded-b-md'>
        {graphType === "month" && (
          <MonthGraph />
        )}
        {graphType === "week" && (
          <WeekGraph graphType={graphType} />
        )}
      </div>
    </div>
  );
};
