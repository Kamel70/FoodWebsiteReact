import { use } from "react";
import { useEffect, useState } from "react";

function FoodList() {
  let [meals, setMeals] = useState({
    loading: false,
    meals: [],
  });

  useEffect(() => {
    setMeals({ loading: true });
    fetch("http://localhost:3000/meals")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>Food List</h1>
      <ul>
        <li>Pizza</li>
        <li>Burger</li>
        <li>Pasta</li>
      </ul>
    </div>
  );
}

export default FoodList;
