import styles from "./style.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const ProductCard = ({data}) => {
  return (
    <div className={cx("container")}>
      <h1>{data}</h1>
    </div>
  );
};

export default ProductCard;
