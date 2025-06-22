import { useActionState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../UI/Modal";
import { hideCheckout } from "../../rtk/slices/user-progress-slice";
import Button from "../UI/Button";
import { formatprice } from "../../util/formatting";
import Input from "../UI/Input";
import useHTTp from "../../hooks/useHTTP";
import { clearCart } from "../../rtk/slices/cart-slice";
import Error from "../Error/Error";

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
  const { data, error, sendRequest, resetData } = useHTTp({
    url: "https://foodwebsitebackend-production.up.railway.app/orders",
    config,
    initialData: [],
  });
  const handleCloseCheckout = () => {
    dispatch(hideCheckout());
  };
  const handleresetCheckout = () => {
    handleCloseCheckout();
    resetData();
    dispatch(clearCart());
  };
  const handelSendData = async (prevState, fd) => {
    const customerDetails = Object.fromEntries(fd.entries());
    await sendRequest(
      JSON.stringify({
        customer: customerDetails,
        items: cartItems,
      })
    );
  };
  const [formState, formAction, isLoading] = useActionState(
    handelSendData,
    null
  );
  if (data && data.message && data.orderId && !error) {
    return (
      <Modal
        open={userProgress === "checkout"}
        onClose={userProgress === "checkout" ? handleresetCheckout : null}
      >
        <h2>Order Submitted Successfully!</h2>
        <p>Thank you for your order</p>
        <div className="modal-actions">
          <Button type="button" textOnly onClick={handleresetCheckout}>
            OK
          </Button>
        </div>
      </Modal>
    );
  }
  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button type="submit">Submit Order</Button>
    </>
  );
  if (isLoading) {
    actions = <p>Submitting Your Order...</p>;
  }
  return (
    <Modal
      open={userProgress === "checkout"}
      onClose={userProgress === "checkout" ? handleCloseCheckout : null}
    >
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {cartTotal}</p>
        <Input id="name" label="Full Name" type="text" />
        <Input id="email" label="E-mail Address" type="email" />
        <Input id="street" label="Street" type="text" />
        <div className="control-row">
          <Input id="postal-code" label="Postal Code" type="text" />
          <Input id="city" label="City" type="text" />
        </div>
        {error && <Error message="Error in Submiting the order" />}
        <div className="modal-actions">{actions}</div>
      </form>
    </Modal>
  );
}

export default Checkout;
