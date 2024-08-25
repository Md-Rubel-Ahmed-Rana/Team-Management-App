import React from "react";
import { Carousel } from "antd";
import "antd/dist/reset.css";
import { carouselItems } from "@/constants/bannerCarouselData";
import WelcomePage from "../welcome/WelcomePage";

const BackgroundCarousel = () => {
  return (
    <div className="relative h-[90vh] overflow-hidden">
      <Carousel
        autoplay
        className="absolute inset-0 carousel"
        effect="fade"
        dots={false}
        arrows={false}
        speed={1000}
      >
        {carouselItems.map((item, index) => (
          <div key={index} className="carousel-slide">
            <img
              src={item.src}
              alt={item.alt}
              className="w-full object-cover h-[100vh]"
            />
          </div>
        ))}
      </Carousel>
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <WelcomePage />
    </div>
  );
};

export default BackgroundCarousel;
