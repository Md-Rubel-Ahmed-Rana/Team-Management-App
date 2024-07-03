import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import SocialIcon from "./SocialIcon";

// those should come from constants data
const socialIcons = [
  {
    icon: <FaFacebook key={""} />,
    link: "https://www.facebook.com/mdrubelahmed.rana.98",
  },
  {
    icon: <FaTwitter key={""} />,
    link: "https://twitter.com/MdRubelAhmed521",
  },
  {
    icon: <FaLinkedin key={""} />,
    link: "https://www.linkedin.com/in/md-rubel-ahmed-rana/",
  },
  {
    icon: <FaInstagram key={""} />,
    link: "https://www.instagram.com/mdrubelahmed.rana.98/",
  },
];

const Footer = () => {
  return (
    <footer className="shadow-lg p-16">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-8 md:mb-0">
          <h1 className="text-2xl font-bold mb-2">Team Manager</h1>
          <p className="text-sm">Streamlining teamwork for success.</p>
        </div>
        <div className="flex space-x-4">
          {socialIcons.map((icon, index) => (
            <SocialIcon
              key={index}
              style="text-blue-400 hover:text-gray-500 transition duration-300 text-4xl"
              icon={icon?.icon}
              link={icon?.link}
            />
          ))}
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} Team Manager. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
