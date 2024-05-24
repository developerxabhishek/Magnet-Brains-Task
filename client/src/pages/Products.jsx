import { products } from "../data/data";
import { useDispatch } from "react-redux";
import { addtocart } from "../redux/slices/cartSlice";
const Products = () => {
  const dispatch = useDispatch();
  const addProductToCart = async (product) => {
    await dispatch(
      addtocart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: 1,
      })
    );
  };
  return (
    <>
      <div className="product-container">
        {products.map((key, index) => {
          return (
            <div className="product-box" key={index}>
              <img src={key.image} alt="product-img" />
              <h1>{key.title}</h1>
              <div className="cart-button-price">
                <button
                  onClick={() => {
                    addProductToCart(key);
                  }}
                >
                  Add to Cart
                </button>{" "}
                <span> $ {key.price}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default Products;
