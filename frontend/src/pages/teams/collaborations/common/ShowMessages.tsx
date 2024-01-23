import React, { useEffect, useRef } from "react";
interface Poster {
  name: string;
  image: string;
}

export interface Post {
  poster: Poster;
  text: string;
  images: string[];
  files: string[];
  links: string[];
}

interface Props {
  messages: Post[];
}

const ShowMessages = ({ messages }: Props) => {
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div
      ref={messagesContainerRef}
      className="mx-auto mt-8 h-60  overflow-hidden hover:overflow-auto  scrollbar scrollbar-w-[4px] scrollbar-thumb-blue-600 scrollbar-thin-rounded-md scrollbar-track-slate-100"
    >
      {messages.map((post, index) => (
        <div
          key={index}
          className="mx-auto bg-white shadow-lg rounded-md p-6 mb-8"
        >
          <div className="flex items-center mb-4">
            <img
              src={post.poster.image}
              alt={post.poster.name}
              className="w-10 h-10 rounded-full mr-4"
            />
            <span className="font-bold">{post.poster.name}</span>
          </div>
          <p className="text-gray-800 mb-4">{post.text}</p>

          {post.images.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-4">
              {post.images.map((image, imageIndex) => (
                <img
                  key={imageIndex}
                  src={image}
                  alt={`Announcement ${imageIndex}`}
                  className="w-20 h-20 rounded-md"
                />
              ))}
            </div>
          )}

          {post.files.length > 0 && (
            <div className="mb-4">
              {post.files.map((file, fileIndex) => (
                <a
                  key={fileIndex}
                  href={file}
                  className="text-blue-500 hover:underline block mb-2"
                >
                  <small>{file}</small>
                </a>
              ))}
            </div>
          )}

          {post.links.length > 0 && (
            <div className="mb-4">
              {post.links.map((link, linkIndex) => (
                <a
                  key={linkIndex}
                  href={link}
                  className="text-blue-500 hover:underline block mb-2"
                >
                  <small>{link}</small>
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ShowMessages;
