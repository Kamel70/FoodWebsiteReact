import useHTTP from "../../hooks/useHTTP";
import { Loading } from "../Loading/Loading";
import FoodCard from "./FoodCard";

const Config = {};
function FoodList() {
  const {
    isLoading,
    error,
    data: meals,
  } = useHTTP({
    url: "http://localhost:3000/meals",
    config: Config,
    initialData: [],
  });
  if (isLoading) {
    return <Loading message="Loading meals..." />;
  }
  if (error) {
    return <Error message={error} />;
  }
  return (
    <ul id="meals">
      {meals.map((meal) => (
        <FoodCard key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}

export default FoodList;
