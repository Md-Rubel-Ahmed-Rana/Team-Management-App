/* eslint-disable @next/next/no-img-element */
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useLoggedInUserQuery, useUpdateUserMutation } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import useUploadFile from "@/hooks/useUploadFile";

const EditProfilePage = ({ setIsEdit }: { setIsEdit: any }) => {
  const { data }: any = useLoggedInUserQuery({});
  const user: IUser = data?.data;
  const [isChangeImage, setIsChangeImage] = useState(false);
  const [updateUser] = useUpdateUserMutation();
  const uploadFile = useUploadFile();
  const { register, handleSubmit } = useForm<IUser>({
    defaultValues: user,
  });

  const handleEditProfile: SubmitHandler<IUser> = async (data) => {
    const updated: any = await updateUser({
      id: user._id,
      data,
    });
    if (updated?.data?.success) {
      setIsEdit(false);
    }
  };

  const handleChangeProfileImage = async (e: any) => {
    const result = await uploadFile(e?.target?.files[0]);
    if (result?.url) {
      const updated: any = await updateUser({
        id: user._id,
        data: { profile_picture: result?.url },
      });
      if (updated?.data?.success) {
        setIsChangeImage(false);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Edit Profile</h1>
      <form onSubmit={handleSubmit(handleEditProfile)} className="mt-4">
        {!isChangeImage && (
          <div className="mb-4 relative">
            <label className="block text-sm font-medium ">Image</label>
            <img
              className="w-20 h-20 rounded-full border-2 "
              src={user?.profile_picture}
              alt="Profile image"
            />

            <div className="flex justify-center items-center absolute bottom-2 left-12 rounded-full">
              <button
                onClick={() => setIsChangeImage(true)}
                className="bg-gray-600 p-3 rounded-full"
              >
                <FaCamera className=" text-white" />
              </button>
            </div>
          </div>
        )}
        {isChangeImage && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Image
            </label>
            <input
              onChange={(e) => handleChangeProfileImage(e)}
              type="file"
              className="mt-1 p-2 w-full border rounded-md bg-white"
            />
            <button
              className="bg-sky-600 px-4 py-1 mt-2 rounded-md text-white"
              onClick={() => setIsChangeImage(false)}
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
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Department
          </label>
          <input
            type="text"
            {...register("department")}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Designation
          </label>
          <input
            type="text"
            {...register("designation")}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mt-4 flex items-center gap-4">
          <button type="submit" className="border px-4 py-2 rounded-md">
            Save Changes
          </button>
          <button
            onClick={() => setIsEdit(false)}
            className="border px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
