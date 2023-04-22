import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShoppingSession } from "~/store/sessionSlice";

const ShoppingSession = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchShoppingSession(user.id));
    }
  }, [user]);

  return <>{children}</>;
};

export default ShoppingSession;
