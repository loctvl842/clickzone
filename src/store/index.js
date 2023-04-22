import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import productReducer from "./productSlice";
import modalReducer from "./modalSlice";
import cartReducer from "./cartSlice";
import shoppingSessionReducer from "./sessionSlice";
import orderReducer from "./orderSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    user: userReducer,
    modal: modalReducer,
    product: productReducer,
    session: shoppingSessionReducer,
    order: orderReducer,
  },
});
