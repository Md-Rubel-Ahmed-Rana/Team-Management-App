import { config } from "@/configurations/envConfig";
import axios from "axios";

const deletePreviousFileFromCloudinary = async (public_id: string) => {
  try {
    const response = await axios.delete(
      `${config.cloudinary.cloudinaryApi}/delete/single`,
      {
        data: { public_id },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error deleting file from Cloudinary:",
        error.response?.data || error.message
      );
      throw new Error(
        `Failed to delete file: ${
          error.response?.data?.message || error.message
        }`
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred while deleting the file.");
    }
  }
};

export default deletePreviousFileFromCloudinary;
