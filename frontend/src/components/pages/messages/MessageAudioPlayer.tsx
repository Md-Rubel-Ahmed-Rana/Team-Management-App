type Props = {
  url: string;
  extension: string;
};

const MessageAudioPlayer = ({ url, extension }: Props) => {
  return (
    <audio
      controls
      className="w-full max-w-md border rounded-full mt-1"
      preload="metadata"
    >
      <source src={url} type={`audio/${extension}`} />
      Your browser does not support the audio element.
    </audio>
  );
};

export default MessageAudioPlayer;
