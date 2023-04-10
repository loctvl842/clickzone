import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { modalClose, modalOpen } from "~/store/modalSlice";

// icons
import { Delete, Edit } from "@mui/icons-material";

// components
// import { ProductCardAction } from "~/components";

// modal
import { modals } from "~/modal";
import ConfirmBox, { modal_type as confirmBox_modal_type } from "~/modal/ConfirmBox";
import ProductForm, { modal_type as productForm_modal_type } from "~/modal/ProductForm";
import { removeProduct } from "~/store/productSlice";

let cx = classNames.bind(styles);

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user);

  const handleRemoveBtnClick = (e) => {
    e.preventDefault();
    modals[confirmBox_modal_type] = (
      <ConfirmBox
        question={`Are you sure you want to remove <b>${product.name}</b> from your shop?`}
        confirmBtnText="Remove"
        onConfirm={handleRemoveConfirm}
      />
    );
    dispatch(modalOpen(confirmBox_modal_type));
  };

  const handleRemoveConfirm = () => {
    dispatch(removeProduct(product.id));
    dispatch(modalClose());
  };

  const handleEditProduct = (e) => {
    e.preventDefault();
    modals[productForm_modal_type] = <ProductForm product={product} />;
    dispatch(modalOpen(productForm_modal_type));
  };

  return (
    <div className={cx("container")}>
      {product && (
        <NavLink to={{ pathname: `/${product.name.trim()}/${product.id}` }} className={cx("product-item")}>
          {user && user.is_admin && (
            <div className={cx("actions")}>
              <ul>
                <li>
                  <button className={cx("icon")} onClick={handleRemoveBtnClick}>
                    <Delete />
                  </button>
                </li>
                <li>
                  <button className={cx("icon")} onClick={handleEditProduct}>
                    <Edit />
                  </button>
                </li>
              </ul>
            </div>
          )}
          <div className={cx("card")}>
            <span className={cx("img-wrapper")}>
              <img src={product.image_url} alt="" />
            </span>
            <p className={cx("price-sale")}>
              {"Code "}
              <b>
                {product.id}
                <span className={cx("price")}>{product.price}</span>
                <span className={cx("old-price")}>{product.old_price}</span>
              </b>
            </p>
            <span className={cx("name")}>{product.name}</span>
          </div>
        </NavLink>
      )}
    </div>
  );
};

export default ProductCard;
