import styles from "./style.module.scss";
import classNames from "classnames/bind";

// icons
import { AddShoppingCart } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSingleProduct } from "~/hook";

let cx = classNames.bind(styles);

const calculateDiscount = (oldPrice, price) => {
  return "-" + parseInt(((oldPrice - price) / oldPrice) * 100) + "%";
};

const SingleProduct = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const product = useSingleProduct();

  const handleAddToCart = () => {
    if (Cookies.get("token") === undefined) {
      navigate("/login");
    }
  };

  const handleQuanityChange = (e) => {
    setQuantity(e.target.value);
  };

  useEffect(() => {
    if (product === null) return;
    document.querySelector("#content").innerHTML = product.description;
  }, [product]);

  return (
    <div className={cx("container")}>
      {product && (
        <div className={cx("wrapper")}>
          <div className={cx("col-5")}>
            <div className={cx("img-wrapper")}>
              <div className={cx("img-box")}>
                <img src={product.image_url} alt="" />
              </div>
            </div>
          </div>
          <div className={cx("col-7")}>
            <div className={cx("product")}>
              <div className={cx("product__info")}>
                <div className={cx("name")}>
                  <h1>{product.name}</h1>
                </div>
                <div className={cx("productid")}>
                  Code: <b>{product.id}</b>
                </div>
                <br />
                <p className={cx("old-price")}>
                  <span>Old price: </span>
                  {product.old_price && <span>{product.old_price}</span>}
                  {" ("}
                  <span style={{ color: "#f00" }}>{calculateDiscount(product.old_price, product.price)}</span>
                  {")"}
                </p>
                <p>
                  <span>Price: </span>
                  <span className={cx("new-price")}>{product.price}</span>
                </p>
              </div>
              <div className={cx("product__options")}>
                Switch:
                <br />
                <div className={cx("btn-group")}>
                  <div className={cx("btn", "active")}>
                    <span>Blue Switch</span>
                  </div>
                  <div className={cx("btn")}>
                    <span>Red Switch</span>
                  </div>
                </div>
                <div className={cx("quantity-buy")}>
                  <div className={cx("quantity-box")}>
                    <input
                      type="button"
                      className={cx("quantity-btn", "plus")}
                      value="+"
                      onClick={() => setQuantity((prev) => prev + 1)}
                    />
                    <input
                      type="button"
                      className={cx("quantity-btn", "minus")}
                      value="-"
                      onClick={() => {
                        if (quantity > 1) {
                          setQuantity((prev) => prev - 1);
                        }
                      }}
                    />
                    <input type="text" className={cx("count")} value={quantity} onChange={handleQuanityChange} />
                  </div>
                  <button className={cx("buy-btn")} onClick={handleAddToCart}>
                    <div className={cx("btn-wrapper")}>
                      <AddShoppingCart fontSize="small" />
                      <span>Add to cart</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("col-12")}>
            <div id="content" className={cx("content")}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
