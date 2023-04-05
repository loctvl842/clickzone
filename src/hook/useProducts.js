import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useProducts() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const page_number = params.get("page") ?? 0;

  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetch_data = async () => {
      const res = await axios.get(`/api/product/get_by_page.php?page=${page_number}`);
      setProducts(res.data.products);
    };
    fetch_data();
  }, [page_number]);
  return products;
}
