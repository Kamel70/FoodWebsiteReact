import { useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../../rtk/slices/cart-slice";
import { formatprice } from "../../util/formatting";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  return (
    <li className="cart-item">
      <div>
        <p>
          <strong>{item.product.name}</strong>
        </p>
        <p>{formatprice.format(item.product.price)} each</p>
      </div>
      <div className="cart-item-actions">
        <button onClick={() => dispatch(deleteFromCart(item.product))}>
          -
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => dispatch(addToCart(item.product))}>+</button>
        <span>{formatprice.format(item.product.price * item.quantity)}</span>
      </div>
    </li>
  );
}
