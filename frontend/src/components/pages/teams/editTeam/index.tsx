import { useUpdateTeamMutation } from "@/features/team";
import { useLoggedInUserQuery } from "@/features/user";
import { ITeam } from "@/interfaces/team.interface";
import { IUser } from "@/interfaces/user.interface";
import { useRouter } from "next/router";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";

const TeamEditPage = () => {
  const router = useRouter();
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { id, name, category, description } = router.query;
  const initValues: any = {
    name: name || "",
    category: category || "",
    description: description || "",
  };
  const { register, handleSubmit } = useForm<ITeam>({
    defaultValues: initValues,
  });
  const [updateTeam] = useUpdateTeamMutation();

  const handleEditTeam: SubmitHandler<ITeam> = async (data: ITeam) => {
    const result: any = await updateTeam({ id, data });
    if (result?.data?.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: result?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      router.push({
        pathname: "/dashboard",
        query: { uId: user.id, activeView: "my-teams" },
      });
    }
    if (!result?.data?.success) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: result?.error.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleCancelEdit = () => {
    router.push({
      pathname: "/dashboard",
      query: { uId: user.id, activeView: "my-teams" },
    });
  };

  return (
    <form onSubmit={handleSubmit(handleEditTeam)} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-md font-medium ">
          Name
        </label>
        <input
          defaultValue={name}
          type="text"
          id="name"
          {...register("name")}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block text-md font-medium">
          Category
        </label>
        <input
          defaultValue={category}
          type="text"
          id="category"
          {...register("category")}
          className="mt-1 p-2 border rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-md font-medium">
          Description
        </label>
        <textarea
          defaultValue={description}
          id="description"
          {...register("description")}
          className="mt-1 p-2 border rounded-md w-full"
          rows={5}
        ></textarea>
      </div>
      <div className="flex justify-between gap-5 items-center">
        <button
          onClick={handleCancelEdit}
          type="button"
          className=" w-full border-2 px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 w-full text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default TeamEditPage;
