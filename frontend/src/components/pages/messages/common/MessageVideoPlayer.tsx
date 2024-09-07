type Props = {
  url: string;
  extension: string;
  posterUrl?: string;
};

const MessageVideoPlayer = ({ url, extension, posterUrl }: Props) => {
  return (
    <video
      controls
      className="w-full max-w-md h-60 lg:h-80 border rounded-md mt-1"
      preload="metadata"
      poster={posterUrl} // Poster image for better UX
    >
      <source src={url} type={`video/${extension}`} />
      Your browser does not support the video tag.
    </video>
  );
};

export default MessageVideoPlayer;
