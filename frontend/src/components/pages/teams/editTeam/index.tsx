import { SocketContext } from "@/context/SocketContext";
import { useUpdateTeamMutation, useGetSingleTeamQuery } from "@/features/team";
import { useLoggedInUserQuery } from "@/features/user";
import { INewTeam } from "@/interfaces/team.interface";
import { IUser } from "@/interfaces/user.interface";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import toast from "react-hot-toast";

const TeamEditPage = () => {
  const { socket }: any = useContext(SocketContext);
  const router = useRouter();
  const { id } = router.query;
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const [teamLogo, setTeamLogo] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, setValue, watch } = useForm<INewTeam>({
    defaultValues: {
      name: "",
      category: "",
      description: "",
    },
  });

  const { data: teamData } = useGetSingleTeamQuery(id as string);
  const [updateTeam] = useUpdateTeamMutation();

  useEffect(() => {
    if (teamData?.data) {
      const { name, category, description, image } = teamData.data;
      setValue("name", name);
      setValue("category", category);
      setValue("description", description);
      setExistingImage(image);
    }
  }, [teamData, setValue]);

  const handleEditTeam: SubmitHandler<INewTeam> = async (data: INewTeam) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("admin", user.id || "");

    if (teamLogo) {
      formData.append("file", teamLogo);
    }

    const result: any = await updateTeam({ id, data: formData });
    setLoading(false);
    if (result?.data?.success) {
      toast.success(result?.data?.message || "Team updated successfully!");
      result?.data?.data?.forEach((memberId: string) => {
        if (memberId) {
          // send notification to all members to notify that team name updated
          socket.emit("notification", memberId);
        }
      });
      router.back();
    } else {
      toast.success(
        result?.data?.message ||
          result?.error?.data?.message ||
          "Team wasn't updated!"
      );
    }
  };

  return (
    <div className="p-6 mx-auto max-w-2xl">
      <h3 className="text-xl font-bold mb-5">Edit Team</h3>

      <form onSubmit={handleSubmit(handleEditTeam)}>
        <div className="relative w-full py-2">
          <p className="text-stone-500 dark:text-white mb-2">Team name</p>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Team name is required" }}
            render={({ field, fieldState }) => (
              <div>
                <input
                  {...field}
                  type="text"
                  placeholder="Team Name"
                  className={`w-full rounded-lg dark:text-white bg-transparent border ${
                    fieldState.error ? "border-red-500" : "border-[#BCBCBC]"
                  } placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B] py-3 outline-none px-2 shadow-sm sm:text-sm`}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <div className="relative w-full py-2">
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <div>
                <p className="text-stone-500 dark:text-white mb-2">
                  Team image
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setTeamLogo(file);
                      setValue("image", URL.createObjectURL(file));
                    }
                  }}
                  className="w-full rounded-lg dark:text-white bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B] py-3 outline-none px-2 shadow-sm sm:text-sm"
                />
                {existingImage && !watch("image") && (
                  <div className="w-full flex justify-between items-center mt-2 rounded-lg bg-transparent border border-[#BCBCBC] py-3 outline-none px-2 shadow-sm">
                    <h4 className="dark:text-white">Team Logo</h4>
                    <img
                      className="w-14 h-14 border-2 rounded-full"
                      src={existingImage}
                      alt="Existing Team"
                    />
                  </div>
                )}
                {watch("image") && (
                  <div className="w-full flex justify-between items-center mt-2 rounded-lg bg-transparent border border-[#BCBCBC] py-3 outline-none px-2 shadow-sm">
                    <h4 className="dark:text-white">New Image</h4>
                    <img
                      className="w-14 h-14 border-2 rounded-full"
                      src={watch("image")}
                      alt="Selected"
                    />
                  </div>
                )}
              </div>
            )}
          />
        </div>

        <div className="relative w-full py-2">
          <p className="text-stone-500 dark:text-white mb-2">Team category</p>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Team category is required" }}
            render={({ field, fieldState }) => (
              <div>
                <input
                  {...field}
                  type="text"
                  placeholder="Category (Digital Generation)"
                  className={`w-full rounded-lg bg-transparent border ${
                    fieldState.error ? "border-red-500" : "border-[#BCBCBC]"
                  } placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B] py-3 outline-none px-2 shadow-sm sm:text-sm`}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <div className="relative w-full py-2">
          <p className="text-stone-500 dark:text-white mb-2">
            Team description
          </p>
          <Controller
            name="description"
            control={control}
            rules={{ required: "Team description is required" }}
            render={({ field, fieldState }) => (
              <div>
                <textarea
                  {...field}
                  rows={5}
                  placeholder="Description (Grow Your Team With Ease: Effortlessly Add Members For Increase Performance And Achievement)"
                  className={`w-full rounded-lg bg-transparent border ${
                    fieldState.error ? "border-red-500" : "border-[#BCBCBC]"
                  } placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B] py-3 outline-none px-2 shadow-sm sm:text-sm`}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <div className="mt-5 flex justify-between items-center gap-5">
          <button
            type="button"
            onClick={() => router.back()}
            className={`border border-gray-300 w-full rounded-full px-6 py-2 ${
              loading
                ? "bg-gray-400 text-gray-300 cursor-not-allowed"
                : "bg-gray-400 text-white hover:bg-gray-500"
            } transition-colors duration-200`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Cancel"}
          </button>
          <button
            type="submit"
            className={`bg-blue-700 text-white  w-full rounded-full px-6 py-2 ${
              loading ? "bg-blue-600 cursor-not-allowed" : "hover:bg-blue-800"
            } transition-colors duration-200`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamEditPage;
