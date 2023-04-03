import styles from "./style.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const ProductCreationForm = () => {
  return (
    <div className={cx("container")}>
      <h1>ProductCreationForm</h1>
    </div>
  );
};

export default ProductCreationForm;
