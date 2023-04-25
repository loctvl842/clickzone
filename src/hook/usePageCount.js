import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useQuery from "./useQuery";

export default function usePageCount() {
  const [count, setCount] = useState(0);
  const query = useQuery();
  const category_id = useParams().category_id;
  useEffect(() => {
    const countProduct = async () => {
      const pageSize = import.meta.env.VITE_PAGE_SIZE;
      const params = {};
      const search_string = query.get("query");

      if (category_id) params.category_id = category_id;
      if (search_string) params.search_string = search_string;

      try {
        const res = await axios.get(`/api/product/count.php`, { params });
        const productCount = res.data;
        const pageCount = parseInt(productCount / pageSize) + 1;
        setCount(pageCount);
      } catch (e) {
        console.log(e.response.data);
      }
    };
    countProduct();
  }, [query, category_id]);
  return count;
}
