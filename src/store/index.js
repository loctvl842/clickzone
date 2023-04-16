import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import productReducer from "./productSlice";
import modalReducer from "./modalSlice";
import cartReducer from "./cartSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    modal: modalReducer,
    cart: cartReducer,
  },
});
