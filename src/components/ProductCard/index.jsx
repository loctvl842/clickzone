import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";

// icons
import { Delete, Edit, AddCircle } from "@mui/icons-material";

// utils
import { formatCurrency } from "~/util";

// modal
import { modals } from "~/modal";
import ConfirmBox, {
  modal_type as confirmBox_modal_type,
} from "~/modal/ConfirmBox";
import ProductForm, {
  modal_type as productForm_modal_type,
} from "~/modal/ProductForm";
import { removeProduct } from "~/store/productSlice";
import { modalClose, modalOpen } from "~/store/modalSlice";
import { useState } from "react";

let cx = classNames.bind(styles);

const ProductCard = ({ product, user }) => {
  const dispatch = useDispatch();
  const [imgLoading, setImgLoading] = useState(true);

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
      {product !== undefined && (
        <img
          src={product.image_url}
          onLoad={() => setImgLoading(false)}
          style={{ display: "none" }}
          alt=""
        />
      )}
      {product !== undefined && !imgLoading ? (
        <NavLink
          to={{ pathname: `/${product.name.trim()}/${product.id}` }}
          className={cx("content")}
        >
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
              <img src={product.image_url} className={cx("image")} alt="" />
            </span>
            <p className={cx("price-sale")}>
              {"Code "}
              <b>
                {product.id}
                <span className={cx("price")}>
                  {formatCurrency(product.price)}
                </span>
                {product.old_price && (
                  <span className={cx("old-price")}>
                    {formatCurrency(product.old_price)}
                  </span>
                )}
              </b>
            </p>
            <span className={cx("name")}>{product.name}</span>
          </div>
        </NavLink>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className={cx("content")}>
      <div className={cx("card")}>
        <span
          className={cx("img-wrapper", "skeleton-box")}
          style={{ display: "block" }}
        ></span>
        <p className={cx("price-sale")}>
          <span
            className={cx("skeleton-box")}
            style={{ width: 70, height: 17 }}
          ></span>
          <span
            className={cx("price", "skeleton-box")}
            style={{ width: 120, height: 17 }}
          ></span>
          <span
            className={cx("old-price", "skeleton-box")}
            style={{ width: 100, height: 12 }}
          ></span>
        </p>
        <span className={cx("name")}>
          <div
            className={cx("skeleton-box")}
            style={{ width: "100%", height: 36 }}
          ></div>
        </span>
      </div>
    </div>
  );
};

const CreateButton = () => {
  const dispatch = useDispatch();
  const handleAddNewProductClick = () => {
    modals[productForm_modal_type] = <ProductForm />;
    dispatch(modalOpen(productForm_modal_type));
  };
  return (
    <div className={cx("container")}>
      <div className={cx("add-btn-wrapper")}>
        <div className={cx("add-btn")} onClick={handleAddNewProductClick}>
          <AddCircle style={{ fontSize: 100, userSelect: "none" }} />
        </div>
      </div>
      <div className={cx("content")}>
        <span className={cx("img-wrapper")}></span>
        <p className={cx("price-sale")}></p>
        <span className={cx("name")}></span>
      </div>
    </div>
  );
};

ProductCard.Loading = () => (
  <div className={cx("container")}>
    <Skeleton />
  </div>
);
ProductCard.CreateButton = CreateButton;

export default ProductCard;
