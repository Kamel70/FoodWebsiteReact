function NavBar() {
  return (
    <nav id="main-header">
      <div id="title">
        <img src={"/src/assets/logo.jpg"} alt="React Food" />
        <h1>React Food</h1>
      </div>
      <button>Cart</button>
    </nav>
  );
}

export default NavBar;
