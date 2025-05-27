import { useRef } from "react";
import Cart from "./components/Cart";
import FoodList from "./components/FoodList";
import NavBar from "./components/NavBar";
import Checkout from "./components/Checkout";

function App() {
  const dialogRef = useRef();
  const checkoutRef = useRef();
  const openCheckout = () => {
    checkoutRef.current.showModal();
    closeCart();
  };
  const closeCheckout = () => {
    checkoutRef.current.close();
  };
  const openCart = () => {
    dialogRef.current.showModal();
  };

  const closeCart = () => {
    dialogRef.current.close();
  };
  return (
    <>
      <NavBar openCart={openCart} />
      <Cart
        dialog={dialogRef}
        closeCart={closeCart}
        openCheckout={openCheckout}
      />
      <Checkout dialog={checkoutRef} closeCheckout={closeCheckout} />
      <FoodList />
    </>
  );
}

export default App;
