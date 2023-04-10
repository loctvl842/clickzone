import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function usePageCount() {
  const [count, setCount] = useState(0);
  const pageSize = parseInt(useSelector((state) => state.product.pageSize));
  useEffect(() => {
    const countProduct = async () => {
      try {
        const res = await axios.get("api/product/count.php");
        const productCount = res.data;
        const pageCount = parseInt(productCount / pageSize) + 1;
        setCount(pageCount);
      } catch (e) {
        console.log(e.response.data);
      }
    };
    countProduct();
  }, [pageSize]);
  return count;
}
