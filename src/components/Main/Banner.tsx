import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Banner1 from "../../assets/banner1.png";
import Banner2 from "../../assets/banner2.png";
// import Banner3 from "../../assets/image/banner3.png";
// import Banner4 from "../../assets/image/banner4.png";
// import Banner5 from "../../assets/image/banner5.png";

const Banner: React.FC = () => {
  const images = [Banner1, Banner2];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots: React.ReactNode) => (
      <ul className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center p-0 m-0 list-none z-10">
        {dots}
      </ul>
    ),
    customPaging: () => (
      <button className="w-[10px] h-[10px] bg-black/30 rounded-full transition-all duration-300" />
    ),
  };

  return (
    <div className="w-[87%] mx-auto relative overflow-hidden">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`banner-${index + 1}`}
              className="w-full h-auto"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
