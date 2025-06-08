import { useCalorieApi } from '../../hooks/useCalorieApi';
import { WeekGraphContent } from './WeekGraphContent';

export const WeekGraph = ({ graphType }) => {
  const { calorieList } = useCalorieApi();
  if (calorieList == null) return null;

  return (
    <WeekGraphContent calorieList={calorieList} graphType={graphType} />
  );
};
