import { useSelector } from "react-redux";
import { BsHandbag } from "react-icons/bs";
import { Link } from "react-router-dom";
const Navbar = () => {
  const cartData = useSelector((state) => state.cartSlice.cart);
  return (
    <>
      <div className="nav">
        <h1>
          <Link to="/products">SwiftCart</Link>
        </h1>
        <h1>
          <Link to="/cart" className="cart-icon">
            <BsHandbag />
            <span>{cartData.length}</span>
          </Link>
        </h1>
      </div>
    </>
  );
};

export default Navbar;
