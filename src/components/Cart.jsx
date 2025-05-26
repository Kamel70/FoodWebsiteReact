import { useSelector, useDispatch } from "react-redux";
import { addToCart, clearCart, deleteFromCart } from "../rtk/slices/cart-slice";

function Cart({ dialog, closeCart }) {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <dialog ref={dialog} onClose={closeCart} className="cart">
      <h2>Your Cart</h2>
      <button onClick={() => dispatch(clearCart())}> Clear Cart</button>

      <ul>
        {cartItems &&
          cartItems.map((item) => (
            <li key={item.product.id} className="cart-item">
              <div>
                <p>
                  <strong>{item.product.name}</strong>
                </p>
                <p>${item.product.price} each</p>
              </div>
              <div className="cart-item-actions">
                <button onClick={() => dispatch(deleteFromCart(item.product))}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(addToCart(item.product))}>
                  +
                </button>
                <span>${item.product.price * item.quantity}</span>
              </div>
            </li>
          ))}
      </ul>

      <div className="cart-total">
        Total: $
        {cartItems.reduce(
          (acc, item) => acc + item.quantity * item.product.price,
          0
        )}
      </div>

      <div className="modal-actions">
        <button className="text-button" onClick={closeCart}>
          Close
        </button>
        <button>Checkout</button>
      </div>
    </dialog>
  );
}
export default Cart;
