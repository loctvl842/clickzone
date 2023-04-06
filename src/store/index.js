import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import productReducer from "./productSlice";
import confirmModalReducer from "./confirmModalSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    confirmModal: confirmModalReducer,
  },
});
