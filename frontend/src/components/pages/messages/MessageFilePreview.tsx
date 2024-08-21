import { RxCross2 } from "react-icons/rx";

type Props = {
  filePreview: string[];
  setFilePreview: (values: string[]) => void;
  files: FileList | undefined | null;
  setFiles: (values: FileList) => void;
};

const MessageFilePreview = ({
  filePreview,
  setFilePreview,
  files,
  setFiles,
}: Props) => {
  const removeFile = (index: number) => {
    const updatedFiles = [...filePreview];
    updatedFiles.splice(index, 1);
    setFilePreview(updatedFiles);

    const updatedFilesList = Array.from(files!).filter(
      (_, i) => i !== index
    ) as unknown as FileList;
    setFiles(updatedFilesList);
  };
  return (
    <>
      {filePreview.length > 0 && (
        <div className="mb-4">
          {filePreview?.map((fileName, index) => (
            <div key={index} className="relative">
              <div className="text-blue-500 hover:underline block mb-2">
                <small>{fileName}</small>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="absolute top-0 right-0 p-1 bg-white rounded-full text-red-500 hover:bg-gray-100"
              >
                <RxCross2 />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MessageFilePreview;
