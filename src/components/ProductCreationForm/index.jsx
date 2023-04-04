import styles from "./style.module.scss";
import classNames from "classnames/bind";
import { FormControl } from "..";
import { PulseLoader } from "react-spinners";

let cx = classNames.bind(styles);

const ProductCreationForm = () => {

  return (
    <div className={cx("form-wrapper")}>
      <div className={cx("message-wrapper", { visible: false })}>
        <p className={cx("message")}>some message</p>
      </div>
      <div className={cx("card")}>
        <div className={cx("header")}>
          <h2>Add Product</h2>
        </div>
        <form className={cx("form-product-creation")}>
          <div className={cx("form-control-wrapper")}>
            <FormControl name="product-creation_name" placeholder="Product name" type="text" />
          </div>
          <div className={cx("form-control-wrapper")}>
            <FormControl name="product-creation_name" placeholder="Product name" type="text" />
          </div>
          <button type="submit" className={cx("submit-btn")}>
            <span>Create</span>
            <PulseLoader color="#fff" size={5} loading={false} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductCreationForm;
