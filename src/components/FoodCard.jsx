import AddButton from "./AddButton";

function FoodCard({ meal }) {
  const url = `http://localhost:3000/`;
  return (
    <li className="meal-item">
      <article>
        <img src={url + meal.image} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{meal.price}</p>
          <p className="meal-item-description">{meal.description}</p>
          <div className="meal-item-actions">
            <AddButton meal={meal} />
          </div>
        </div>
      </article>
    </li>
  );
}

export default FoodCard;
