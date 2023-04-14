import styles from "./style.module.scss";
import classNames from "classnames/bind";

import { v4 as uuidv4 } from "uuid";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";

// slides
import slide1 from "~/assets/slide1.png";
import slide2 from "~/assets/slide2.png";

let cx = classNames.bind(styles);

const HomeSlideShow = () => {
  const links = [slide1, slide2];

  return (
    <div className={cx("container")}>
      <div className={cx("swiper-wrapper")}>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 1000, running: true }}
          loop={true}
        >
          {links.map((link) => (
            <SwiperSlide key={uuidv4()}>
              <div className={cx("img-wrapper")}>
                <img src={link} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlideShow;
