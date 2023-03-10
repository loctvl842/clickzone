import styles from "./style.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const Navbar = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("row-1")}>
          <div className={cx("left")}>left</div>
          <div className={cx("center")}>center</div>
          <div className={cx("right")}>right</div>
        </div>
        <div className={cx("row-2")}></div>
      </div>
    </div>
  );
};

export default Navbar;
