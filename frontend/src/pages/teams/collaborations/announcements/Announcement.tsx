import React, { useState } from "react";
import ShowMessages, { Post } from "../common/ShowMessages";
import MessageForm from "../common/MessageForm";

const data: Post[] = [
  {
    poster: {
      name: "Rubel Ahmed",
      image: "https://i.ibb.co/xG4nxP2/emad.jpg",
    },
    text: "Hello everyone, Quick heads up! Check out the Slack Announcement Channel ASAP for crucial details on our upcoming program. Your input matters! 🎉  Let's make it epic together!",
    images: [
      "https://i.ibb.co/H2KsQ5Z/team3.png",
      "https://i.ibb.co/H2KsQ5Z/team3.png",
    ],
    files: [
      "https://drive.google.com/file/d/1I7vTDQckRYWJphJzXCpO-gyOKKDIHum2/view",
      "https://drive.google.com/file/d/1I7vTDQckRYWJphJzXCpO-gyOKKDIHum2/view",
      "https://drive.google.com/file/d/1I7vTDQckRYWJphJzXCpO-gyOKKDIHum2/view",
    ],
    links: [
      "https://drive.google.com/file/d/1I7vTDQckRYWJphJzXCpO-gyOKKDIHum2/view",
    ],
  },
  {
    poster: {
      name: "Robiul Islam",
      image: "https://i.ibb.co/xG4nxP2/emad.jpg",
    },
    text: "Hello everyone, We have a meeting on 30 January at 02:00PM",
    images: [],
    files: [],
    links: [
      "https://drive.google.com/file/d/1I7vTDQckRYWJphJzXCpO-gyOKKDIHum2/view",
      "https://drive.google.com/file/d/1I7vTDQckRYWJphJzXCpO-gyOKKDIHum2/view",
      "https://drive.google.com/file/d/1I7vTDQckRYWJphJzXCpO-gyOKKDIHum2/view",
    ],
  },
  {
    poster: {
      name: "Robiul Islam",
      image: "https://i.ibb.co/xG4nxP2/emad.jpg",
    },
    text: "Here is the meet link",
    images: [],
    files: [],
    links: ["https://meet.google.com/kfz-oakz-ysy"],
  },
];

const Announcement = () => {
  const [message, setMessage] = useState();
  return (
    <div>
      <ShowMessages messages={data} />
      <MessageForm />
    </div>
  );
};

export default Announcement;
