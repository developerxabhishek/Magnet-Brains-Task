import React from "react";
import { removeCart } from "../redux/slices/cartSlice";
import { useDispatch} from "react-redux";
import { useEffect } from "react";
const Success = () => {

  return <div className="payment-succesfull">
    
    <img src="/images/paymentsuccess.gif" alt="payment-successfull" />
      </div>;

  
};
export default Success;
