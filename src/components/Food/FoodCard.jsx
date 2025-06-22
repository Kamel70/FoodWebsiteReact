import Button from "../UI/Button";
import { formatprice } from "../../util/formatting";
import { addToCart } from "../../rtk/slices/cart-slice";
import { useDispatch } from "react-redux";

function FoodCard({ meal }) {
  const url = `https://foodwebsitebackend-production.up.railway.app/`;
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };
  return (
    <li className="meal-item">
      <article>
        <img src={url + meal.image} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{formatprice.format(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
          <div className="meal-item-actions">
            <Button onClick={() => handleAddToCart(meal)}>Add To Cart</Button>
          </div>
        </div>
      </article>
    </li>
  );
}

export default FoodCard;
