/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import EditProfilePage from "./EditProfile";
import { useLoggedInUserQuery, useUpdateUserMutation } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import useUploadFile from "@/hooks/useUploadFile";

const ProfilePage = () => {
  const { data }: any = useLoggedInUserQuery({});
  const user: IUser = data?.data;
  const [isEdit, setIsEdit] = useState<any>(false);
  const [updateUser] = useUpdateUserMutation();

  const uploadFile = useUploadFile();

  const handleChangeProfileImage = async (e: any) => {
    const result = await uploadFile(e?.target?.files[0]);
    if (result?.url) {
      const updated = await updateUser({
        id: user._id,
        data: { profile_picture: result?.url },
      });
    }
  };

  return (
    <div>
      {!isEdit && (
        <div className="p-4">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <div className="mt-4">
            {!user?.profile_picture && (
              <div className="my-3 border w-64 rounded-md p-4 text-lg">
                <p className="mb-2 font-semibold">No Profile picture</p>
                <input
                  onChange={(e) => handleChangeProfileImage(e)}
                  type="file"
                  accept="image/*"
                  name="profile_picture"
                  id="profile_picture"
                />
              </div>
            )}
            {user?.profile_picture && (
              <img
                src={user?.profile_picture}
                alt="Profile picture"
                className="w-24 h-24 rounded-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col gap-3">
            <p>
              <strong>Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Department:</strong> {user?.department || "Not available"}
            </p>
            <p>
              <strong>Designation:</strong>{" "}
              {user?.designation || "Not available"}
            </p>
          </div>
          <div className="mt-4">
            <button
              onClick={() => setIsEdit(true)}
              className="border px-4 py-2 rounded-md"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
      {isEdit && <EditProfilePage setIsEdit={setIsEdit} />}
    </div>
  );
};

export default ProfilePage;
