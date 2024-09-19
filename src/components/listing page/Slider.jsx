import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import IconPrev from "../../assets/icons/icon-left.svg";
import IconNext from "../../assets/icons/icon-right.svg";

export default function Slider({ children }) {
  return (
    <div className="swiper-container">
      <div className="swiper-left hover:cursor-pointer">
        <img src={IconPrev} alt="previous icon" />
      </div>
      <Swiper
        modules={[Navigation]}
        className="mySwiper"
        slidesPerView={4}
        spaceBetween={20}
        navigation={{
          nextEl: ".swiper-right",
          prevEl: ".swiper-left",
        }}
        loop={true}
      >
        {children}
      </Swiper>

      <div className="swiper-right hover:cursor-pointer">
        <img src={IconNext} alt="next icon" />
      </div>
    </div>
  );
}
