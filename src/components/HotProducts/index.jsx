import styles from "./style.module.scss";
import classNames from "classnames/bind";

// components
import { ProductCard } from "~/components";

// key index
import { v4 as uuidv4 } from "uuid";

// icons
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

// Slide show
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useRef } from "react";

let cx = classNames.bind(styles);

const HotProdcuts = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const cards = [1, 2, 3, 4, 5, 6];

  return (
    <div className={cx("container")}>
      <div className={cx("title")}>
        <h4>Hot Product</h4>
      </div>
      <div className={cx("swiper-wrapper")}>
        <Swiper
          modules={[Navigation]}
          slidesPerView={4}
          // centeredSlidesBounds={true}
          spaceBetween={45}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
        >
          {cards.map((card) => (
            <SwiperSlide key={uuidv4()}>
              <ProductCard data={card} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={cx("btn")}>
          <div className={cx("btn__frame", "btn--prev")}>
            <ArrowBackIosNew style={{ fontSize: 32 }} />
          </div>
          {/* <div style={{ width: "100%", height: 1 }}></div> */}
          <div className={cx("btn__frame", "btn--next")}>
            <ArrowForwardIos style={{ fontSize: 32 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotProdcuts;
