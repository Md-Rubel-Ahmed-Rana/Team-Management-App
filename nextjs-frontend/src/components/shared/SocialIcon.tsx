import React from "react";

type Props = {
  icon: any;
  link: string;
  style: string;
};

const SocialIcon = ({ icon, link, style }: Props) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className={style}>
      {icon}
    </a>
  );
};

export default SocialIcon;
