import axios from "axios";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { userSet } from "~/store/userSlice";

export default function useCurrentUser() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get("/api/user/get_current.php");
        if (res.data.user) {
          dispatch(userSet(res.data.user));
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchCurrentUser();
  }, [dispatch]);
}
