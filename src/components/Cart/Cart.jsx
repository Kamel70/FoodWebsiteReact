import { useSelector, useDispatch } from "react-redux";
import Button from "../UI/Button";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import { hideCart, showCheckout } from "../../rtk/slices/user-progress-slice";
import { formatprice } from "../../util/formatting";

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const userProgress = useSelector((state) => state.userProgress);
  const dispatch = useDispatch();
  const cartTotal = formatprice.format(
    cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
  );
  const handleHideCart = () => {
    dispatch(hideCart());
  };
  const handelShowCheckout = () => {
    dispatch(showCheckout());
  };

  return (
    <Modal
      className="cart"
      open={userProgress === "cart"}
      onClose={userProgress === "cart" ? handleHideCart : null}
    >
      <div>
        <h2>Your Cart</h2>
      </div>

      <ul>
        {cartItems &&
          cartItems.map((item) => (
            <CartItem item={item} key={item.product.id} />
          ))}
      </ul>

      <div className="cart-total">
        Total:
        {cartTotal}
      </div>

      <div className="modal-actions">
        <Button
          textOnly={true}
          className="text-button"
          onClick={handleHideCart}
        >
          Close
        </Button>
        {cartItems.length !== 0 && (
          <Button onClick={handelShowCheckout}>Checkout</Button>
        )}
      </div>
    </Modal>
  );
}
export default Cart;
