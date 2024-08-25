import React from "react";
import Slider from "react-slick";
import { popularProjectData } from "@/constants/popularProjectData";

const PopularProjects = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    rows: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="my-8 overflow-hidden">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-4">
        Explore Our Popular Projects
      </h1>
      <p className="text-lg text-center text-gray-600 mb-6 w-full lg:w-1/2 mx-auto">
        Discover the projects that are making an impact. Each project is driven
        by a team of experts and is helping to shape the future of our platform.
      </p>

      <Slider {...settings}>
        {popularProjectData.map((project) => (
          <div
            data-aos={project.animation}
            key={project.id}
            className="px-2 transform transition duration-500 hover:scale-105"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flip-card-inner">
                <div className="flip-card-front p-4">
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {project.category}
                  </p>
                  <p className="text-gray-600">
                    Team:{" "}
                    <span className="font-medium">{project.team.name}</span>
                  </p>
                </div>
                <div className="p-4 bg-gray-50">
                  <p className="text-gray-600">
                    Admin:{" "}
                    <span className="font-medium">{project.user.name}</span>
                  </p>
                  <p className="mt-2 text-gray-600">
                    Members: {project.members}
                  </p>
                  <p className="mt-2 text-gray-600">Tasks: {project.tasks}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PopularProjects;
