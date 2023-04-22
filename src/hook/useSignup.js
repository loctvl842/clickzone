import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authFail, authReset, authStart } from "~/store/authSlice";

export default function useSignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signup = async ({ username, email, password, telephone }) => {
    try {
      dispatch(authStart());
      await axios.post("/api/user/signup.php", {
        username,
        email,
        password,
        telephone,
      });
      dispatch(authReset());
      navigate("/login");
    } catch (err) {
      dispatch(authFail(err.response.data.message));
    }
  };
  return signup;
}
