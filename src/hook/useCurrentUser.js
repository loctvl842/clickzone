import axios from "axios";
import { useEffect, useState } from "react";

export default function useCurrentUser() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get("/api/user/get_current.php");
        if (res.data.user) {
          setUser(res.data.user);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchCurrentUser();
  }, []);
  return user;
}
