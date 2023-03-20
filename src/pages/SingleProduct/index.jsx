import styles from "./style.module.scss";
import classNames from "classnames/bind";

// icons
import { AddShoppingCart } from "@mui/icons-material";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

let cx = classNames.bind(styles);

const SingleProduct = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const id = useParams().productId;

  const handleAddToCart = () => {
    if (Cookies.get("token") === undefined) {
      navigate("/login");
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("col-5")}>
          <div className={cx("img-wrapper")}>
            <div className={cx("img-box")}>
              <img src="http://localhost:3000/assets/dareu-ek87-v2.jpg" alt="" />
            </div>
          </div>
        </div>
        <div className={cx("col-7")}>
          <div className={cx("product")}>
            <div className={cx("product__info")}>
              <div className={cx("name")}>
                <h1>Bàn phím cơ Dareu EK87 V2 (Multi-Led)</h1>
              </div>
              <div className={cx("productid")}>
                Code: <b>1234</b>
              </div>
              <br />
              <p className={cx("old-price")}>
                <span>Old price: </span>
                <span>595.000₫</span>
                {" ("}
                <span style={{ color: "#f00" }}>-17%</span>
                {")"}
              </p>
              <p>
                <span>Price: </span>
                <span className={cx("new-price")}>495.000₫</span>
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
                  <input type="text" className={cx("count")} value={quantity} />
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
          <h3>- Bản nâng cấp của EK87 cũ với màu sắc đẹp hơn, nhiều hiệu ứng hơn, keycap được làm lại, giá ko đổi.</h3>
          <h3>- Led Rainbow Area 6 hiệu ứng, hỗ trợ thêm 5 profile gaming tự setup.</h3>
          <h3>- Switch D công nghệ độc quyền của hãng với độ bền 60 triệu lần.</h3>
          <h3>- Dây cáp cao su, dài 1,5m.</h3>
          <h3>- Sử dụng stab kiểu Cherry giúp bạn dễ thay keycap.</h3>
          <h3>- Bảo hành chính hãng 2 năm + 1 năm tại shop (1 đổi 1 trong 10 ngày đầu nếu lỗi kỹ thuật).</h3>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
