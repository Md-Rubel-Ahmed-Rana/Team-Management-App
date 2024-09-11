/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import EditProfilePage from "./EditProfile";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";

const Profile = () => {
  const { data }: any = useLoggedInUserQuery({});
  const user: IUser = data?.data;
  const [isEdit, setIsEdit] = useState<any>(false);

  return (
    <>
      {!isEdit && (
        <div className="lg:w-1/2 w-full mx-auto lg:shadow-md p-2 lg:p-10">
          <h1 className="text-2xl font-semibold">Profile</h1>
          <div className="mt-4 mb-7">
            {!user?.profile_picture && (
              <img
                src={user?.profile_picture}
                alt="Profile picture"
                className="w-24 h-24 rounded-full object-cover"
              />
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
            <p>
              <strong>Phone No.:</strong> {user?.phoneNumber || "Not available"}
            </p>
            <p>
              <strong>Present Address:</strong>{" "}
              {user?.presentAddress || "Not available"}
            </p>
            <p>
              <strong>Permanent Address:</strong>{" "}
              {user?.permanentAddress || "Not available"}
            </p>
            <p>
              <strong>Country:</strong> {user?.country || "Not available"}
            </p>
          </div>
          <div className="mt-4">
            <button
              onClick={() => setIsEdit(true)}
              className="border px-6 py-2 rounded-md bg-blue-600 text-white"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
      {isEdit && <EditProfilePage setIsEdit={setIsEdit} />}
    </>
  );
};

export default Profile;
