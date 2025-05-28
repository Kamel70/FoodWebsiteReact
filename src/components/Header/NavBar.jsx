import logoImg from "../../assets/logo.jpg";
import { useSelector, useDispatch } from "react-redux";
import Button from "../UI/Button";
import { showCart } from "../../rtk/slices/user-progress-slice";

function NavBar() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const handleOpenCart = () => {
    dispatch(showCart());
  };
  return (
    <nav id="main-header">
      <div id="title">
        <img src={logoImg} alt="React Food" />
        <h1>React Food</h1>
      </div>
      <Button textOnly={true} onClick={handleOpenCart}>
        Cart ({cartItems.length})
      </Button>
    </nav>
  );
}

export default NavBar;
