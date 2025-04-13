import { WeekGraph } from "../components/BarGraph/WeekGraph";

export const BarGraph = () => {
  return (
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="inline-block mb-8 px-5 py-3 bg-black rounded-full text-white text-3xl">消費カロリーの推移</h2>
      <WeekGraph />
    </div>
  );
};
