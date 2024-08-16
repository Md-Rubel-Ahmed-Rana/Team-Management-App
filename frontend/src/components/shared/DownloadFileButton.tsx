import { MdDownload } from "react-icons/md";
import axios from "axios";
import fileDownload from "js-file-download";

type Props = {
  fileUrl: string;
  extension: string;
};

const DownloadFileButton = ({ fileUrl, extension }: Props) => {
  const now = new Date();
  const currentDate = now.toISOString().split("T")[0];
  const time = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getMilliseconds()}`;
  const fileName = `Team_Manager_${currentDate}_${time}.${extension}`;

  const handleDownload = () => {
    axios
      .get(fileUrl, {
        responseType: "blob",
      })
      .then((res) => {
        fileDownload(res.data, fileName);
      });
  };

  return (
    <span
      onClick={handleDownload}
      title="Download the file"
      className="bg-green-500 text-center w-full mt-2 rounded-b-md cursor-pointer text-white flex justify-center items-center"
    >
      <MdDownload className="text-3xl text-center" />
    </span>
  );
};

export default DownloadFileButton;
