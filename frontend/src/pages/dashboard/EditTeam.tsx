// src/components/EditTeamPage.js
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useParams } from "react-router-dom";
import { ITeam } from "../../interfaces/team.interface";
import { useSingleTeamQuery } from "../../features/team/teamApi";

const EditTeamPage = () => {
  const { id } = useParams();
  const { data: teamData, isLoading } = useSingleTeamQuery(id);

  const { register, handleSubmit, setValue } = useForm<ITeam>({
    defaultValues: teamData?.data,
  });

  const onSubmit = (formData: any) => {
    // Handle form submission logic here
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Edit Team</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            defaultValue={teamData?.data?.name}
            type="text"
            {...register("name")}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Category
          </label>
          <input
            defaultValue={teamData?.data?.category}
            type="text"
            {...register("category")}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            defaultValue={teamData?.data?.description}
            {...register("description")}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        {/* Add other form fields as needed */}
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Team"}
          </button>
          <Link to={`/dashboard`} className="text-blue-500">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditTeamPage;
