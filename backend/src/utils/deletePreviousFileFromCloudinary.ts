import { config } from "@/configurations/envConfig";
import axios from "axios";

const deleteSingleFileFromCloudinary = async (public_id: string) => {
  try {
    const response = await axios.delete(
      `${config.cloudinary.cloudinaryApi}/delete/single`,
      {
        data: { public_id },
      }
    );
    console.log("File deleted successfully:", public_id);
    return { success: true, data: response.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error deleting file from Cloudinary:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    // Return an object with success: false but do not throw an error
    return { success: false, error: error.message };
  }
};

const deleteMultipleFileFromCloudinary = async (
  public_ids: { public_id: string }[]
) => {
  try {
    const response = await axios.delete(
      `${config.cloudinary.cloudinaryApi}/delete/many`,
      {
        data: public_ids,
      }
    );
    console.log("Files deleted successfully:", public_ids);
    return { success: true, data: response.data };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error deleting files from Cloudinary:",
        error.response?.data || error.message
      );
    } else {
      console.error("Unexpected error:", error);
    }
    // Return an object with success: false but do not throw an error
    return { success: false, error: error.message };
  }
};

export { deleteSingleFileFromCloudinary, deleteMultipleFileFromCloudinary };
