import toast from "react-hot-toast";

const validateFileSize = (file: File) => {
  const maxSize = 10 * 1024 * 1024;
  if (file.size >= maxSize) {
    toast.error("File size should not be 10MB or more.");
    toast.error(`'${file.name}' file is larger than 10MB.`, {
      duration: 10000,
    });
    return false;
  }

  return true;
};

export default validateFileSize;
