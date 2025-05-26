import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteFromCart } from "../rtk/slices/cart-slice";

function Cart({ dialog, closeCart }) {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <dialog ref={dialog}>
      <div
        className="cart"
        style={{
          padding: "2rem",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <h2>Your Cart</h2>

        <ul>
          {cartItems &&
            cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div>
                  <p>
                    <strong>{item.name}</strong>
                  </p>
                  <p>${item.price} each</p>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => dispatch(deleteFromCart(item))}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(addToCart(item))}>+</button>
                  <span>${item.price * item.quantity}</span>
                </div>
              </li>
            ))}
        </ul>

        <div className="cart-total">Total: $100</div>

        <div className="modal-actions">
          <button
            className="text-button"
            onClick={closeCart}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem 1rem",
            }}
          >
            Close
          </button>
          <button
            style={{
              backgroundColor: "#312c1d",
              color: "#ffc404",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </dialog>
  );
}
export default Cart;
