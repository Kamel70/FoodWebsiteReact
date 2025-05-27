import { useEffect, useState } from "react";
import FoodCard from "./FoodCard";

function FoodList() {
  let [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/meals")
      .then((response) => response.json())
      .then((data) => {
        setMeals(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <ul id="meals">
      {meals.map((meal) => (
        <FoodCard key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}

export default FoodList;
