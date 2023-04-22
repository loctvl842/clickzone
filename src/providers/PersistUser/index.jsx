import { useDispatch, useSelector } from "react-redux";
import { useFetchCurrentUser, useRefreshToken } from "~/hook";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userFetchFinish, userSet } from "~/store/userSlice";

const PersistUser = ({ children, requireLoggedIn = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const fetchCurrenthUser = useFetchCurrentUser();
  const refreshToken = useRefreshToken();
  useEffect(() => {
    const fetch = async () => {
      try {
        let token = accessToken || (await refreshToken());
        if (token) {
          const user = await fetchCurrenthUser(token);
          dispatch(userSet(user));
          dispatch(userFetchFinish());
        } else {
          if (requireLoggedIn) navigate("/login");
        }
      } catch (e) {
        if (e.response.status >= 400 && e.response.status < 500) {
          await refreshToken();
        }
      }
    };
    fetch();
  }, []);
  return <>{children}</>;
};

export default PersistUser;
