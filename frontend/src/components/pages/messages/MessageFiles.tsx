import DownloadFileButton from "@/components/shared/DownloadFileButton";
import GetFileIcon from "@/components/shared/generateFileIconBasedExtension";
import { acceptableExtensions } from "@/constants/acceptableFiles";
import detectFileExtensionFromLink from "@/utils/detectFileExtensionFromLink";
import MessageVideoPlayer from "./MessageVideoPlayer";
import MessageAudioPlayer from "./MessageAudioPlayer";

type Props = {
  files: string[];
};

const MessageFiles = ({ files }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 gap-4 mb-4">
        {files?.map((url: string, fileIndex: number) => {
          const extension = detectFileExtensionFromLink(url);

          if (
            !acceptableExtensions.audio.includes(extension) &&
            !acceptableExtensions.video.includes(extension)
          ) {
            return (
              <div
                className="flex flex-col justify-center items-center border rounded-md"
                key={fileIndex}
              >
                <GetFileIcon extension={extension} />
                <DownloadFileButton fileUrl={url} extension={extension} />
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Display video files */}
      {files?.map((url: string, fileIndex: number) => {
        const extension = detectFileExtensionFromLink(url);

        if (acceptableExtensions.video.includes(extension)) {
          return (
            <div key={fileIndex} className="mb-4 w-full">
              <MessageVideoPlayer url={url} extension={extension} />
            </div>
          );
        }
        return null;
      })}

      {/* Display audio files */}
      {files?.map((url: string, fileIndex: number) => {
        const extension = detectFileExtensionFromLink(url);

        if (acceptableExtensions.audio.includes(extension)) {
          return (
            <div key={fileIndex} className="mb-4">
              <MessageAudioPlayer url={url} extension={extension} />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default MessageFiles;
