import axios from "axios";

const RESOURCE_URL = "https://api.emailjs.com/api/v1.0/email/send";

export default function useDispatchVerifyCode() {
  const dispatchVerifyCode = async ({ to_email, username, verify_code }) => {
    try {
      const data = {
        service_id: import.meta.env.VITE_SERVICE_ID,
        template_id: import.meta.env.VITE_TEMPLATE_ID,
        user_id: import.meta.env.VITE_USER_ID,
        template_params: {
          to_email,
          username,
          verify_code,
        },
      };
      const res = await axios.post(RESOURCE_URL, data);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  return dispatchVerifyCode;
}
