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
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const cards = [
    {
      link: "./assets/durgod-v90-pro.jpg",
      id: 1871,
      newPrice: 245000,
      oldPrice: 490000,
      name: "Chuột Gaming Durgod V90 Pro - 10.000 DPI",
    },
    {
      link: "./assets/dareu-ek87-v2.jpg",
      id: 2313,
      newPrice: 495000,
      oldPrice: 595000,
      name: "Bàn phím cơ Dareu EK87 V2 (Multi-Led)",
    },
    {
      link: "./assets/rk918-white.jpg",
      id: 2750,
      newPrice: 1090000,
      name: "Bàn phím cơ RK918 White - Kèm kê tay",
    },
    {
      link: "./assets/dareu-ek807g-wireless-2-4ghz.jpg",
      id: 2589,
      newPrice: 545000,
      oldPrice: 645000,
      name: "Bàn phím cơ Dareu EK807G - Wireless 2.4ghz",
    },
    {
      link: "./assets/product_card_akko_3061.jpg",
      // link: "./assets/akko3061.png",
      id: 2429,
      newPrice: 1500000,
      oldPrice: 1650000,
      name: "Bàn phím cơ AKKO 3061s RGB - Neon (Bluetooth 5.0)",
    },
  ];

  return (
    <div className={cx("container")}>
      <div className={cx("title")}>
        <h4>Hot Product</h4>
      </div>
      <div className={cx("swiper-wrapper")}>
        <Swiper
          modules={[Navigation]}
          slidesPerView={3}
          // centeredSlidesBounds={true}
          spaceBetween={0}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            // Override prevEl & nextEl now that refs are defined
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            // Re-init navigation
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            992: {
              slidesPerView: 4,
              spaceBetween: 14,
            },
          }}
        >
          {cards.map((card) => (
            <SwiperSlide key={uuidv4()}>
              <ProductCard data={card} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={cx("btn")}>
          <div className={cx("btn__frame", "btn--prev")} ref={prevRef}>
            <ArrowBackIosNew style={{ fontSize: 24 }} />
          </div>
          <div className={cx("btn__frame", "btn--next")} ref={nextRef}>
            <ArrowForwardIos style={{ fontSize: 24 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotProdcuts;
