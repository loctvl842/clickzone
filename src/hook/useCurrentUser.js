import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// store
import { userFetchFinish, userSet } from "~/store/userSlice";
// hook
import { useRefreshToken } from "~/hook";

export default function useCurrentUser() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.user.data);
  const refreshToken = useRefreshToken();
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (accessToken === "") {
          await refreshToken();
        } else {
          const res = await axios.get("/api/user/get_current.php", {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          });
          dispatch(userSet(res.data.user));
        }
      } catch (e) {
        console.log(e.response.data);
      }
      dispatch(userFetchFinish());
    };
    fetchCurrentUser();
  }, [accessToken, dispatch]);
  return user;
}
