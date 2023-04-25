import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const initState = {
  id: null,
  name: "",
};
export default function useCurrentCategory() {
  const category_id = useParams().category_id;
  const [category, setCategory] = useState(initState);
  useEffect(() => {
    const fetch = async () => {
      if (!category_id) setCategory(initState);
      try {
        const res = await axios.get("/api/category/get_by_id.php", {
          params: {
            category_id: category_id,
          },
        });
        const currentCategory = {
          id: res.data.category.id,
          name: res.data.category.name,
        };
        setCategory(currentCategory);
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, [category_id]);
  return category;
}
