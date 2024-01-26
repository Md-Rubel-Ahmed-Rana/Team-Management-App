import Swal from "sweetalert2";
const useUploadFile = () => {
  const imageHostKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  const handleUploadFile = async (file: any) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${imageHostKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      return { url: data?.data?.url };
    } catch (error: any) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong to upload file",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return handleUploadFile;
};

export default useUploadFile;
