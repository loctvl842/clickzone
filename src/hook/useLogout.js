import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { authReset } from "~/store/authSlice";
import { cartReset } from "~/store/cartSlice";
import { orderReset } from "~/store/orderSlice";
import { sessionReset } from "~/store/sessionSlice";
import { userReset } from "~/store/userSlice";

export default function useLogout() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const logout = async () => {
    if (user === null) return;
    try {
      dispatch(userReset());
      dispatch(sessionReset());
      dispatch(authReset());
      dispatch(cartReset());
      dispatch(orderReset());
      await axios.delete(`/api/auth/logout.php?userId=${user.id}`);
      Cookies.remove("refreshToken");
    } catch (e) {
      console.log(e);
    }
  };
  return logout;
}
