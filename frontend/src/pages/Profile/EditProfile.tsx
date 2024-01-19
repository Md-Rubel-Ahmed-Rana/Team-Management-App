// src/components/EditProfilePage.js
import React, { SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLoggedInUserQuery } from "../../features/user/userApi";
import { IUser } from "../../interfaces/user.interface";

const EditProfilePage = ({ setIsEdit }: { setIsEdit: any }) => {
  const { data }: any = useLoggedInUserQuery({});
  const user: IUser = data?.data;

  const { register, handleSubmit } = useForm<IUser>({
    defaultValues: user,
  });

  const handleEditProfile: SubmitHandler<IUser> = async (data) => {
    console.log(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Edit Profile</h1>
      <form onSubmit={handleSubmit(handleEditProfile)} className="mt-4">
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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Profile Picture URL
          </label>
          <input
            type="text"
            {...register("profile_picture")}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Role
          </label>
          <input
            disabled
            type="text"
            {...register("role")}
            className="mt-1 p-2 w-full border rounded-md cursor-not-allowed"
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Save Changes
          </button>
          <button onClick={() => setIsEdit(false)} className="text-blue-500">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
