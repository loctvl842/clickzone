import styles from "./style.module.scss";
import classNames from "classnames/bind";

// icons
import { AddShoppingCart } from "@mui/icons-material";

// utils
import { formatCurrency } from "~/util";

// providers
import { PersistUser } from "~/providers";

// components
import { SlideBanner } from "~/components";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSingleProduct, useTitle } from "~/hook";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartItem,
  selectAllCartItems,
  updateCartItem,
} from "~/store/cartSlice";
import { sessionTotalAdd } from "~/store/sessionSlice";
import { modals, CartForm } from "~/modal";
import { modalOpen } from "~/store/modalSlice";

let cx = classNames.bind(styles);

const calculateDiscount = (oldPrice, price) => {
  return "-" + parseInt(((oldPrice - price) / oldPrice) * 100) + "%";
};

const SingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const product = useSingleProduct();
  const user = useSelector((state) => state.user.data);
  const shoppingSession = useSelector((state) => state.session.data);
  const cartItems = useSelector((state) => selectAllCartItems(state));
  useTitle(product?.name);

  const handleAddToCart = () => {
    if (user === null) {
      navigate("/login");
      return;
    }
    // useSelector(state => state)
    const existingProductInCart = cartItems.find(
      (item) => item.product_id === product.id
    );
    if (existingProductInCart) {
      dispatch(
        sessionTotalAdd(
          (quantity - existingProductInCart.quantity) * product.price
        )
      );
      dispatch(updateCartItem({ id: existingProductInCart.id, quantity }));
    } else {
      dispatch(
        addCartItem({
          session_id: shoppingSession.id,
          product_id: product.id,
          quantity,
        })
      );
      dispatch(sessionTotalAdd(quantity * product.price));
    }

    modals[CartForm.modal_type] = <CartForm />;
    dispatch(modalOpen(CartForm.modal_type));
  };

  const handleQuanityChange = (e) => {
    setQuantity(e.target.value);
  };

  useEffect(() => {
    if (product === null) return;
    document.querySelector("#content").innerHTML = product.description;
  }, [product]);

  return (
    <PersistUser requireLoggedIn={false}>
      <div className={cx("container")}>
        <div className={cx("col-9")}>
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
                    {product.old_price && (
                      <p className={cx("old-price")}>
                        <span>Old price: </span>
                        {product.old_price && (
                          <span>{formatCurrency(product.old_price)}</span>
                        )}
                        {" ("}
                        <span style={{ color: "#f00" }}>
                          {calculateDiscount(product.old_price, product.price)}
                        </span>
                        {")"}
                      </p>
                    )}
                    <p>
                      <span>Price: </span>
                      <span className={cx("new-price")}>
                        {formatCurrency(product.price)}
                      </span>
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
                        <input
                          type="text"
                          className={cx("count")}
                          value={quantity}
                          onChange={handleQuanityChange}
                        />
                      </div>
                      <button
                        className={cx("buy-btn")}
                        onClick={handleAddToCart}
                      >
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
        <div className={cx("col-3")}>{product && <SlideBanner product={product} />}</div>
      </div>
    </PersistUser>
  );
};

export default SingleProduct;
