import React from "react";
import Slider from "react-slick";
import { popularTeamData } from "@/constants/popularTeamData";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PopularTeam = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    fade: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-4">
        Discover Our Most Dynamic Teams
      </h1>
      <p className="text-lg text-center text-gray-600 mb-6 w-full lg:w-1/2 mx-auto">
        Meet the top-performing teams that are driving innovation and
        collaboration on our platform. These teams are actively shaping the
        future with their dedication and expertise.
      </p>

      <Slider {...settings}>
        {popularTeamData.map((team) => (
          <div data-aos={team.animation} key={team.id} className="px-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="w-full">
                <img
                  src={team.image}
                  alt={team.name}
                  className="h-48  ring-1 rounded-md m-2 object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{team.name}</h3>
                <p className="text-sm text-gray-500">{team.category}</p>
                <p className="mt-2 text-gray-600">
                  Admin: <span className="font-medium">{team.admin?.name}</span>
                </p>
                <div className="mt-2 text-gray-600">
                  <p>Active Members: {team.activeMembers}</p>
                  <p>Pending Members: {team.pendingMembers}</p>
                  <p>Projects: {team.projects}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const NextArrow = ({ onClick }: any) => {
  return (
    <div
      className="absolute top-1/2 transform -translate-y-1/2 right-2 z-10 cursor-pointer"
      onClick={onClick}
    >
      <FaChevronRight className="text-gray-800 hover:text-gray-500 text-3xl mb-4" />
    </div>
  );
};

const PrevArrow = ({ onClick }: any) => {
  return (
    <div
      className="absolute top-1/2 transform -translate-y-1/2 left-2 z-10 cursor-pointer"
      onClick={onClick}
    >
      <FaChevronLeft className="text-gray-800 hover:text-gray-500 text-3xl mb-4" />
    </div>
  );
};

export default PopularTeam;
