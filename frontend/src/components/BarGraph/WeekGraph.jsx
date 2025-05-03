import { useCalorieApi } from '../../hooks/useCalorieApi';
import { WeekGraphContent } from './WeekGraphContent';

export const WeekGraph = () => {
  const { calorieList } = useCalorieApi();
  if (calorieList == null) return null;

  return (
    <WeekGraphContent calorieList={calorieList} />
  );
};
