import DownloadFileButton from "@/components/shared/DownloadFileButton";
import GetFileIcon from "@/components/shared/generateFileIconBasedExtension";
import { acceptableExtensions } from "@/constants/acceptableFiles";
import detectFileExtensionFromLink from "@/utils/detectFileExtensionFromLink";

type Props = {
  files: string[];
};

const MessageFiles = ({ files }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
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
              <video controls className="w-full h-48 border rounded-md mt-1">
                <source
                  className="w-full"
                  src={url}
                  type={`video/${extension}`}
                />
                Your browser does not support the video tag.
              </video>
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
              <audio controls className="w-full">
                <source src={url} type={`audio/${extension}`} />
                Your browser does not support the audio element.
              </audio>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default MessageFiles;
