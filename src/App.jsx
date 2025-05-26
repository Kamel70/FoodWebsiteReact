import { useRef } from "react";
import Cart from "./components/Cart";
import FoodList from "./components/FoodList";
import NavBar from "./components/NavBar";

function App() {
  const dialogRef = useRef(null);
  const openCart = () => {
    dialogRef.current.showModal();
  };

  const closeCart = () => {
    dialogRef.current.close();
  };
  return (
    <>
      <NavBar openCart={openCart} />
      <Cart dialog={dialogRef} openCart={openCart} closeCart={closeCart} />
      <FoodList />
    </>
  );
}

export default App;
