import { useUploadMultipleImageMutation } from "@/features/fileUpload";
import Swal from "sweetalert2";
const useUploadMultipleImage = () => {
  const [uploadImages] = useUploadMultipleImageMutation();
  const handleUploadImage = async (images: FileList, setImageUrls: any) => {
    const formData = new FormData();
    Array.from(images).forEach((image, index) => {
      formData.append("images", image);
    });
    try {
      const result: any = await uploadImages(formData);
      if (result?.data?.success) {
        setImageUrls(result?.data?.data);
      }

      if (result?.error) {
        Swal.fire({
          position: "center",
          icon: "error",
          text: result?.error?.data?.message,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: "Error uploading images",
        timer: 1500,
      });
    }
  };
  return handleUploadImage;
};

export default useUploadMultipleImage;
