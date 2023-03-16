import styles from "./style.module.scss";
import classNames from "classnames/bind";

// icons
import { LocalShipping, Call, AccessTimeFilled } from "@mui/icons-material";

let cx = classNames.bind(styles);

const Footer = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("service-wrapper")}>
        <div className={cx("service")}>
          <div className={cx("col")}>
            <div className={cx("icon-wrapper")}>
              <LocalShipping fontSize="small" />
            </div>
            <div className={cx("heading")}>
              <h4>Free shipping within a 5km radius</h4>
            </div>
            <div className={cx("content")}>
              (For bills that are over 500.000 VND)
            </div>
          </div>
          <div className={cx("col")}>
            <div className={cx("icon-wrapper")}>
              <Call fontSize="small" />
            </div>
            <div className={cx("heading")}>
              <h4>
                Purchase:<a href="tel:0967123456">0967.123.456</a>
              </h4>
            </div>
            <div className={cx("content")}>
              Repair, Technical support:
              <a href="tel:0967123456">0967.123.456</a>
            </div>
          </div>
          <div className={cx("col")}>
            <div className={cx("icon-wrapper")}>
              <AccessTimeFilled fontSize="small" />
            </div>
            <div className={cx("heading")}>
              <h4>Working all days of the week.</h4>
            </div>
            <div className={cx("content")}>
              From 9 AM to 7 PM (Repairs, warranty services: 9 AM - 4 PM)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
