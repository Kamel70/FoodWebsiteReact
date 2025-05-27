import FoodList from "./components/Food/FoodList";
import NavBar from "./components/Header/NavBar";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";

function App() {
  return (
    <>
      <NavBar />
      <Cart />
      <Checkout />
      <FoodList />
    </>
  );
}

export default App;
