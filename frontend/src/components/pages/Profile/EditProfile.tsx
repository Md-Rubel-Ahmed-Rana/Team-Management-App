/* eslint-disable @next/next/no-img-element */
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useLoggedInUserQuery, useUpdateUserMutation } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import ImageCropperModal from "@/components/shared/ImageCropperModal";
import validateFileSize from "@/utils/validateFileSize";
import toast from "react-hot-toast";

const EditProfilePage = ({ setIsEdit }: { setIsEdit: any }) => {
  const { data }: any = useLoggedInUserQuery({});
  const user: IUser = data?.data;
  const [isCropImage, setIsCropImage] = useState(false);
  const [isChangeImage, setIsChangeImage] = useState(false);
  const [newFile, setNewFile] = useState<any>(null);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { register, handleSubmit } = useForm<IUser>({
    defaultValues: user,
  });

  const handleEditProfile: SubmitHandler<IUser> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("department", data.department);
    formData.append("designation", data.designation);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("permanentAddress", data.permanentAddress);
    formData.append("presentAddress", data.presentAddress);
    formData.append("country", data.country);

    // If new file is selected, append it to FormData
    if (newFile) {
      formData.append("file", newFile);
    }
    const updated: any = await updateUser({
      id: user.id,
      data: formData, // Pass formData here
    });

    if (updated?.data?.success) {
      setIsEdit(false);
    } else {
      toast.error("Profile wasn't updated");
    }
  };

  const handleChangeProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isValidImageSize = validateFileSize(file);
      if (isValidImageSize) {
        setIsCropImage(true);
        setNewFile(file);
      }
    }
  };

  return (
    <>
      <div className="lg:w-1/2 w-full mx-auto lg:shadow-md p-2 lg:p-10">
        <h1 className="text-2xl font-semibold">Edit Profile</h1>
        <form onSubmit={handleSubmit(handleEditProfile)} className="mt-4">
          <div className="mb-4 relative">
            <img
              className="w-20 h-20 rounded-full border-2"
              src={
                newFile ? URL.createObjectURL(newFile) : user?.profile_picture
              }
              alt="Profile image"
            />

            {!isChangeImage && (
              <div className="flex justify-center items-center absolute bottom-2 left-12 rounded-full">
                <button
                  onClick={() => setIsChangeImage(true)}
                  className="bg-gray-600 p-3 rounded-full"
                >
                  <FaCamera className="text-white" />
                </button>
              </div>
            )}
          </div>

          {isChangeImage && (
            <div className="mb-4">
              {!newFile && (
                <>
                  <label className="block text-sm font-medium text-gray-600">
                    Image
                  </label>
                  <input
                    onChange={handleChangeProfileImage}
                    type="file"
                    accept="image/*"
                    className="mt-1 p-2 w-full border rounded-md bg-white text-gray-800"
                  />
                </>
              )}
              <button
                className="bg-sky-600 px-4 py-1 mt-2 rounded-md text-white"
                onClick={() => {
                  setIsChangeImage(false);
                  setNewFile(null);
                }}
              >
                Cancel
              </button>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="mt-1 p-2 w-full border rounded-md bg-white text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 p-2 w-full border rounded-md bg-white text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Department
            </label>
            <input
              type="text"
              {...register("department")}
              className="mt-1 p-2 w-full border rounded-md bg-white text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Designation
            </label>
            <input
              type="text"
              {...register("designation")}
              className="mt-1 p-2 w-full border rounded-md bg-white text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Phone number
            </label>
            <input
              type="text"
              {...register("phoneNumber")}
              className="mt-1 p-2 w-full border rounded-md bg-white text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Present address
            </label>
            <input
              type="text"
              {...register("presentAddress")}
              className="mt-1 p-2 w-full border rounded-md bg-white text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Permanent address
            </label>
            <input
              type="text"
              {...register("permanentAddress")}
              className="mt-1 p-2 w-full border rounded-md bg-white text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Country
            </label>
            <input
              type="text"
              {...register("country")}
              className="mt-1 p-2 w-full border rounded-md bg-white text-gray-800"
            />
          </div>
          <div className="mt-4 flex items-center gap-4">
            <button
              disabled={isLoading}
              onClick={() => setIsEdit(false)}
              className={`border ${
                isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-yellow-500"
              }  text-white px-4 py-2 rounded-md`}
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className={`border ${
                isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600"
              }  text-white px-4 py-2 rounded-md`}
            >
              {isLoading ? "Saving..." : " Save Changes"}
            </button>
          </div>
        </form>
      </div>
      {isCropImage && (
        <ImageCropperModal
          isOpen={isCropImage}
          setIsOpen={setIsCropImage}
          uploadedImage={newFile}
          setCroppedImage={setNewFile}
        />
      )}
    </>
  );
};

export default EditProfilePage;
