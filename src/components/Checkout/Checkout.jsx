import { useSelector, useDispatch } from "react-redux";
import Modal from "../UI/Modal";
import { hideCheckout } from "../../rtk/slices/user-progress-slice";
import Button from "../UI/Button";
import { formatprice } from "../../util/formatting";
import Input from "../UI/Input";
import useHTTp from "../../hooks/useHTTP";

const config = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
function Checkout() {
  const dispatch = useDispatch();
  const userProgress = useSelector((state) => state.userProgress);
  const cartItems = useSelector((state) => state.cart);
  const cartTotal = formatprice.format(
    cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
  );
  const { data, error, isLoading, sendRequest } = useHTTp({
    url: "http://localhost:3000/orders",
    config,
    initialData: [],
  });
  const handleCloseCheckout = () => {
    dispatch(hideCheckout());
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerDetails = Object.fromEntries(fd.entries());
    sendRequest(
      JSON.stringify({
        customer: customerDetails,
        items: cartItems,
      })
    );
  };
  if (error) {
    return (
      <Modal open={userProgress === "checkout"} onClose={handleCloseCheckout}>
        <Error message="Error in Submiting the order" />
      </Modal>
    );
  }
  return (
    <Modal
      open={userProgress === "checkout"}
      onClose={userProgress === "checkout" ? handleCloseCheckout : null}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {cartTotal}</p>
        <Input id="name" label="Full Name" type="text" />
        <Input id="email" label="E-mail Address" type="email" />
        <Input id="street" label="Street" type="text" />
        <div className="control-row">
          <Input id="postal-code" label="Postal Code" type="text" />
          <Input id="city" label="City" type="text" />
        </div>

        <div className="modal-actions">
          <Button type="button" textOnly onClick={handleCloseCheckout}>
            Close
          </Button>
          {isLoading ? (
            <Button type="submit" disabled>
              Submitting...
            </Button>
          ) : (
            <Button type="submit">Submit Order</Button>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default Checkout;
