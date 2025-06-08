import { useCalorieApi } from '../../hooks/useCalorieApi';
import { MonthGraphContent } from './MonthGraphContent';

export const MonthGraph = () => {
  const { calorieList } = useCalorieApi();
  if (calorieList == null) return null;

  return (
    <MonthGraphContent calorieList={calorieList} />
  );
};
