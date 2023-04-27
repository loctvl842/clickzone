import axios from "axios";
import { useEffect, useState } from "react";

export default function useSimilarProducts(product) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      if (product === null) return;
      const res = await axios.get(
        "/api/product/get_similar_product_in_category.php",
        { params: { category_id: product.category_id } }
      );
      setProducts(res.data.products);
    };
    fetch();
  }, [product]);
  return products;
}
