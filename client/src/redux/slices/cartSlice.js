import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialState,
  reducers: {
    addtocart: (state, action) => {
      var myitem = state.cart.filter((key) => key.id === action.payload.id);
      if (myitem.length >= 1) {
        toast.warn("This product is already in the cart", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        state.cart.push(action.payload);
        toast.success("Successfully added to cart", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    },
    qtyIncrease: (state, action) => {
      for (var i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id === action.payload.id) {
          state.cart[i].quantity++;
        }
      }
    },
    qtyDecrease: (state, action) => {
      for (var i = 0; i < state.cart.length; i++) {
        if (state.cart[i].id === action.payload.id) {
          if (state.cart[i].quantity > 1) {
            state.cart[i].quantity--;
          } else {
            toast.warn("Quantity must be greater than 1", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        }
      }
    },
    removeCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
      toast.success("Successfully removed from cart", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    clearCart: (state) => {
      state.cart = [];
      toast.success("Cart cleared successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },

  },
});

export const { addtocart, qtyIncrease, qtyDecrease, removeCart } =
  cartSlice.actions;
export default cartSlice.reducer;
