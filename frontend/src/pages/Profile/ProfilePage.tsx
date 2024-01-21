// src/components/ProfilePage.js
import React, { useState } from "react";

import { useLoggedInUserQuery } from "../../features/user/userApi";
import { IUser } from "../../interfaces/user.interface";
import EditProfilePage from "./EditProfile";

const ProfilePage = () => {
  const { data }: any = useLoggedInUserQuery({});
  const user: IUser = data?.data;
  const [isEdit, setIsEdit] = useState<any>(false);

  return (
    <div>
      {!isEdit && (
        <div className="p-4">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <div className="mt-4">
            <img
              src={user.profile_picture}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <div className="mt-4">
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Department:</strong> {user.department}
            </p>
            <p>
              <strong>Designation:</strong> {user.designation}
            </p>
          </div>
          <div className="mt-4">
            <button
              onClick={() => setIsEdit(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
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
