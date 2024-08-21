import { acceptableExtensions } from "@/constants/acceptableFiles";
import { BiSolidFilePdf } from "react-icons/bi";
import {
  FaFileArchive,
  FaFileAlt,
  FaFileCode,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
} from "react-icons/fa";
import { MdInsertDriveFile } from "react-icons/md";

type Props = {
  extension: string;
};

const GetFileIcon = ({ extension }: Props) => {
  if (acceptableExtensions.document.includes(extension)) {
    switch (extension) {
      case "pdf":
        return (
          <BiSolidFilePdf className="text-red-500 text-3xl lg:text-6xl w-full mt-1" />
        );
      case "doc":
      case "docx":
        return (
          <FaFileWord className="text-blue-700 text-3xl lg:text-6xl w-full mt-1" />
        );
      case "xls":
      case "xlsx":
        return (
          <FaFileExcel className="text-green-600 text-3xl lg:text-6xl w-full mt-1" />
        );
      case "ppt":
      case "pptx":
        return (
          <FaFilePowerpoint className="text-orange-600 text-3xl lg:text-6xl w-full mt-1" />
        );
      default:
        return (
          <FaFileAlt className="text-gray-500 text-3xl lg:text-6xl w-full mt-1" />
        );
    }
  }
  if (acceptableExtensions.archive.includes(extension)) {
    return (
      <FaFileArchive className="text-yellow-500 text-3xl lg:text-6xl w-full mt-1" />
    );
  }
  if (acceptableExtensions.executable.includes(extension)) {
    return (
      <MdInsertDriveFile className="text-gray-800 text-3xl lg:text-6xl w-full mt-1" />
    );
  }
  if (acceptableExtensions.web.includes(extension)) {
    return (
      <FaFileCode className="text-green-500 text-3xl lg:text-6xl w-full mt-1" />
    );
  }

  return (
    <FaFileAlt className="text-gray-500 text-3xl lg:text-6xl w-full mt-1" />
  );
};

export default GetFileIcon;
