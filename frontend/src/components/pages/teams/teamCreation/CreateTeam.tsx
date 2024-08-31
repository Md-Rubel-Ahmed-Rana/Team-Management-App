import { useCreateTeamMutation } from "@/features/team";
import { useLoggedInUserQuery } from "@/features/user";
import { INewTeam } from "@/interfaces/team.interface";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import validateFileSize from "@/utils/validateFileSize";
import ImageCropperModal from "@/components/shared/ImageCropperModal";
import { IUser } from "@/interfaces/user.interface";
import toast from "react-hot-toast";

const CreateTeamPage = () => {
  const { data } = useLoggedInUserQuery({});
  const user: IUser = data?.data;
  const queries = `userId=${user?.id}&name=${user?.name}&email=${user?.email}`;
  const router = useRouter();
  const [createTeam, { isLoading }] = useCreateTeamMutation();
  const [teamLogo, setTeamLogo] = useState<any>(null);
  const [isCropImage, setIsCropImage] = useState(false);

  const { handleSubmit, control } = useForm<INewTeam>({
    defaultValues: {
      name: "",
      image: "",
      category: "",
      description: "",
      admin: user?.id || "",
    },
  });

  const onSubmit = async (data: INewTeam) => {
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
    if (result?.data?.success) {
      toast.success(result?.data?.message || "Team created successfully!");
      router.push(`/teams/my-teams?${queries}`);
    } else {
      toast.error(
        result?.data?.message ||
          result?.error?.data?.message ||
          "Team wasn't created!"
      );
    }
  };

  const handleChangeTeamLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isValidImageSize = validateFileSize(file);
      if (isValidImageSize) {
        setTeamLogo(file);
        setIsCropImage(true);
      }
    }
  };

  return (
    <>
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
                  {teamLogo && (
                    <div className="w-full flex justify-between items-center mt-2 rounded-lg bg-transparent border border-[#BCBCBC] py-3 outline-none px-2 shadow-sm">
                      <h4 className="dark:text-white">Team image</h4>
                      <img
                        className="w-14 h-14 border-2 rounded-full"
                        src={URL.createObjectURL(teamLogo)}
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
                isLoading
                  ? "bg-gray-400 text-gray-300 cursor-not-allowed"
                  : "bg-gray-400 text-white hover:bg-gray-500"
              } transition-colors duration-200`}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Back"}
            </button>
            <button
              type="submit"
              className={`bg-blue-700 text-white  w-full rounded-full px-6 py-2 ${
                isLoading
                  ? "bg-gray-500 hover:bg-gray-600 cursor-not-allowed"
                  : "hover:bg-blue-800 bg-blue-600"
              } transition-colors duration-200`}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
      {isCropImage && (
        <ImageCropperModal
          isOpen={isCropImage}
          setIsOpen={setIsCropImage}
          uploadedImage={teamLogo}
          setCroppedImage={setTeamLogo}
        />
      )}
    </>
  );
};

export default CreateTeamPage;
