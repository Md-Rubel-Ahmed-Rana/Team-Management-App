import { useCreateTeamMutation } from "@/features/team";
import { useLoggedInUserQuery } from "@/features/user";
import { INewTeam } from "@/interfaces/team.interface";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import validateFileSize from "@/utils/validateFileSize";

const CreateTeamPage = () => {
  const { data }: any = useLoggedInUserQuery({});
  const user = data?.data;
  const router = useRouter();
  const [createTeam] = useCreateTeamMutation();
  const [teamLogo, setTeamLogo] = useState<any>(null);
  const [loading, setLoading] = useState(false); // Loading state

  const { handleSubmit, control, setValue, watch } = useForm<INewTeam>({
    defaultValues: {
      name: "",
      image: "",
      category: "",
      description: "",
      admin: user?.id || "",
    },
  });

  const onSubmit = async (data: INewTeam) => {
    setLoading(true); // Start loading
    const formData = new FormData();

    // Append text fields to FormData
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("admin", data.admin || user?.id);

    if (teamLogo) {
      formData.append("file", teamLogo);
    }

    const result: any = await createTeam(formData);
    setLoading(false); // End loading

    if (result?.data?.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: result?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/teams");
    } else if (result?.error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: result?.error?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleChangeTeamLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isValidImageSize = validateFileSize(file);
      if (isValidImageSize) {
        setTeamLogo(file);
        setValue("image", URL.createObjectURL(file));
      }
    }
  };

  return (
    <div className="p-6 mx-auto max-w-2xl">
      <h3 className="text-xl font-bold mb-5">Create a new team</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
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
                  onChange={handleChangeTeamLogo}
                  className="w-full rounded-lg dark:text-white bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B] py-3 outline-none px-2 shadow-sm sm:text-sm"
                />
                {watch("image") && (
                  <div className="w-full flex justify-between items-center mt-2 rounded-lg bg-transparent border border-[#BCBCBC] py-3 outline-none px-2 shadow-sm">
                    <h4 className="dark:text-white">Team image</h4>
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
            {loading ? "Loading..." : "Back"}
          </button>
          <button
            type="submit"
            className={`bg-blue-700 text-white  w-full rounded-full px-6 py-2 ${
              loading ? "bg-blue-600 cursor-not-allowed" : "hover:bg-blue-800"
            } transition-colors duration-200`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeamPage;
