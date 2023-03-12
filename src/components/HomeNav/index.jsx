import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

let cx = classNames.bind(styles);

const HomeNav = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <Swiper modules={[Autoplay]} autoplay={{ delay: 1000, running: true }}>
          <SwiperSlide>
            <div className={cx("item")}>
              <img src="./Banner.png" alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={cx("item")}>
              <img src="./akko3061.png" alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={cx("item")}>
              <img src="./Banner.png" alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={cx("item")}>
              <img src="./akko3061.png" alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={cx("item")}>
              <img src="./Banner.png" alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={cx("item")}>
              <img src="./akko3061.png" alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={cx("item")}>
              <img src="./Banner.png" alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={cx("item")}>
              <img src="./akko3061.png" alt="" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeNav;
