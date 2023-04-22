import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "~/store/cartSlice";

const CartItems = ({ children }) => {
  const dispatch = useDispatch();
  const shoppingSession = useSelector((state) => state.session.data);
  const cartStatus = useSelector((state) => state.cart.status);
  useEffect(() => {
    if (shoppingSession && shoppingSession.id && cartStatus === "idle") {
      dispatch(fetchCartItems(shoppingSession.id));
    }
  }, [dispatch, shoppingSession]);
  return <>{children}</>;
};

export default CartItems;
