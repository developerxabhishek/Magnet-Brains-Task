import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin5Line } from "react-icons/ri";
import { loadStripe } from "@stripe/stripe-js";

import { Link } from "react-router-dom";

import {
  qtyDecrease,
  qtyIncrease,
  removeCart,
} from "../redux/slices/cartSlice";

const Cart = () => {
  let Sum = 0;

  const [cartItems, setCartItems] = useState("");
  const [email,setEmail]=useState("")
  const cartData = useSelector((state) => state.cartSlice.cart);
  const dispatch = useDispatch();

  const cardQuantity = () => {
    if (cartData.length > 0) {
      setCartItems(`Cart (${cartData.length} items)`);
    } else {
      setCartItems("Your Cart is empty");
    }
  };
  useEffect(() => {
    cardQuantity();
  });
  console.log(email)

  //This function is for increasing the quantity of the product in cart...
  const proqtyInc = (id) => {
    dispatch(qtyIncrease({ id: id }));
  };

  //This function is for decreasing the quantity of the product in cart...
  const proqtyDec = (id) => {
    dispatch(qtyDecrease({ id: id }));
  };

  //this function is for removing the product from the cart...
  const productRemove = (id) => {
    dispatch(removeCart({ id: id }));
  };

  //payment integration...
  const makePayment = async () => {
    if(!email){
      alert("please enter your email")
    }
    else{
      
    const stripe = await loadStripe(
      //This is the publishable key of our stripe payment api...
      "pk_test_51PJjyxSDNAiTNrgQ4WR19Fqwzfb41K9OWbyR6ODWGdVChqMzOs7gqzEJMzvx7W9j4aIm5FuwmZlnJ4Xd8snVtrbk00h6ybj0zI"
    );
    const body = {
      products: cartData,
      email:email
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:7000/api/create-checkout-session",
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }
    );
    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    console.log(result)
    if (result.error) {
      console.log(result.error);
    }
    }
    setEmail("")
  };

  return (
    <>
      <div className="cart">
        <h1>Shopping Cart</h1>
        <div className="cart-container">
          <div className="cart-part1">
            <h6 className="cart-h6">{cartItems}</h6>

            {cartData.map((key) => {
              Sum += key.quantity * key.price;
              return (
                <div className="cart-part-1-content">
                  <div className="cart-part-1-img">
                    <img src={key.image} alt="img" height="100%" width="100%" />
                  </div>
                  <div className="cart-part1-details">
                    <div className="cart-quantity-handler">
                      <h2> </h2>{" "}
                      <div>
                        {" "}
                        <span
                          onClick={() => {
                            proqtyDec(key.id);
                          }}
                          className="cart-quant-handler"
                        >
                          -
                        </span>{" "}
                        <span>{key.quantity}</span>{" "}
                        <span
                          onClick={() => {
                            proqtyInc(key.id);
                          }}
                          className="cart-quant-handler"
                        >
                          +
                        </span>{" "}
                      </div>
                    </div>
                    <p>{key.title}</p>

                    <div className="cartremove">
                      <div className="cart-buttons">
                        <button
                          onClick={() => {
                            productRemove(key.id);
                          }}
                          className="cartButtons"
                        >
                          {" "}
                          <span>
                            <RiDeleteBin5Line
                              style={{ fontSize: "20px", marginRight: "10px" }}
                            />
                          </span>
                          <span className="wishremove">Remove Item</span>
                        </button>
                      </div>
                      <h2 className="cart-total-price">
                         {key.quantity * key.price}
                      </h2>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-part2">
            <h6 className="cart-h6">The total Amount of</h6>
            <div className="cart-page-checkout">
              <p>Total Price </p>
              <p>$ {Sum}</p>
            </div>

            <hr size="1" />
            <div className="cart-page-checkout">
              <p>Amount to pay </p>
              <p>$ {Sum}</p>
            </div>
            <div className="cart-page-checkout">
             <input type="email" name="email" placeholder="Please Enter Your Email" onChange={(e)=>{
              setEmail(e.target.value)
             }}  className="email-input"/>
            </div>
            

            <button
              className="go-to-checkout cartButtons"
              onClick={makePayment}
            >
              <Link>Go to Checkout</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
