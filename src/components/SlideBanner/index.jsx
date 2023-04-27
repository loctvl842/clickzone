import styles from "./style.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import { useNavbarFloat } from "~/hook";
import { NavLink } from "react-router-dom";
import useSimilarProducts from "~/hook/useSimilarProducts";
import { formatCurrency, slugify } from "~/util";

let cx = classNames.bind(styles);

const SlideBanner = ({ product }) => {
  const navbarFloat = useNavbarFloat();
  const [top, setTop] = useState(0);
  const products = useSimilarProducts(product);
  useEffect(() => {
    const handleScroll = () => {
      setTop(window.scrollY - 126 + 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className={cx("container")} style={{ top: navbarFloat ? top : 0 }}>
      <div className={cx("title")}>
        <h4>Similar Products</h4>
      </div>
      {products.map((p) => (
        <div key={p.id} className={cx("card")}>
          <NavLink
            to={{
              pathname: `/${slugify(p.name)}/p/${p.id}`,
            }}
            className={cx("image-wrapper")}
          >
            <img src={p.image_url} alt="" />
          </NavLink>
          <p className={cx("price")}>{formatCurrency(p.price)}</p>
        </div>
      ))}
    </div>
  );
};

export default SlideBanner;
