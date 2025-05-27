import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Banner1 from "../../assets/banner1.png";
import Banner2 from "../../assets/banner2.png";
import Banner3 from "../../assets/banner3.png";
import Banner4 from "../../assets/banner4.png";

const Banner: React.FC = () => {
  const images = [Banner1, Banner2, Banner3, Banner4];
  const lectureIds = [15, 42, 34, 57];

  const [current, setCurrent] = useState(0);
  const sliderRef = useRef<Slider>(null);
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (_oldIndex: number, newIndex: number) => {
      setCurrent(newIndex);
    },
  };

  const goToSlide = (index: number) => {
    sliderRef.current?.slickGoTo(index);
  };

  const onBannerClick = (index: number) => {
    const lectureId = lectureIds[index];
    navigate(`/lectures/${lectureId}`);
  };

  return (
    <div className="w-[87%] mx-auto relative overflow-visible">
      <Slider {...settings} ref={sliderRef}>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`banner-${index + 1}`}
              className="w-full h-auto cursor-pointer"
              onClick={() => onBannerClick(index)}
            />
          </div>
        ))}
      </Slider>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-30 pointer-events-auto">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`w-[10px] h-[10px] rounded-full transition-all duration-300 cursor-pointer ${
              i === current ? "bg-white" : "bg-[#888888]"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
