import { useSelector, useDispatch } from "react-redux";
import Modal from "../UI/Modal";
import { hideCheckout } from "../../rtk/slices/user-progress-slice";

function Checkout() {
  const dispatch = useDispatch();
  const userProgress = useSelector((state) => state.userProgress);
  return (
    <Modal open={userProgress === "checkout"}>
      <h2>Checkout</h2>
      <p>Thank you for your order!</p>
      <p>Your order will be processed shortly.</p>
      <div className="modal-actions">
        <button onClick={() => dispatch(hideCheckout())}>Close</button>
      </div>
    </Modal>
  );
}

export default Checkout;
