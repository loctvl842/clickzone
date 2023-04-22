import axios from "axios";

export default function useCreateOrderDetails() {
  const createOrderDetails = async ({ user_id, total }) => {
    const res = await axios.post("/api/order_details/create.php", {
      user_id,
      total,
    });
    return res.data.order_details;
  };
  return createOrderDetails;
}
