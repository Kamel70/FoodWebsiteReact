import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../rtk/slices/cart-slice";

function AddButton({ meal }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const addCart = () => {
    dispatch(addToCart(meal));
    console.log("meal", meal);
    console.log("cart", cart);
  };
  return (
    <button className="add-to-cart-btn" onClick={addCart}>
      Add to Cart
    </button>
  );
}
export default AddButton;
