import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Select from "react-select";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import { useMyTeamsQuery } from "@/features/team";
import { INewProject } from "@/interfaces/project.interface";
import { useCreateProjectMutation } from "@/features/project";
import customStyles from "@/utils/reactSelectCustomStyle";

const CreateProjectModal = ({ isOpen, setIsOpen }: any) => {
  const closeModal = () => {
    setIsOpen(false);
  };
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: teamData } = useMyTeamsQuery(user?.id);
  const [selectedTeam, setSelectedTeam] = useState<{
    label: string;
    value: string;
  }>({ label: "", value: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewProject>();

  const [createProject, { isLoading }] = useCreateProjectMutation();

  const handleCreateNewProject: SubmitHandler<INewProject> = async (data) => {
    data.user = user?.id || "";
    data.team = selectedTeam.value;
    const result: any = await createProject(data);
    if (result?.data?.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: result?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      closeModal();
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Something went wrong to create project",
        showConfirmButton: false,
        timer: 1500,
      });
      closeModal();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center">
          <div className="p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="lg:w-[400px] w-[300px] mx-auto transform rounded-xl bg-orange-50 dark:bg-gray-600 dark:text-white lg:p-6 p-3 text-left shadow-xl transition-all relative">
                <div className="mt-3">
                  <form onSubmit={handleSubmit(handleCreateNewProject)}>
                    <h3 className="text-xl font-bold">Create a new project</h3>

                    <div className="relative w-full py-2">
                      <p className="text-stone-500 dark:text-white">
                        Select a team
                      </p>
                      <Select
                        required
                        options={
                          teamData?.data &&
                          teamData?.data?.map((team: any) => ({
                            value: team?.id,
                            label: team?.name,
                          }))
                        }
                        styles={customStyles}
                        onChange={(team: any) => setSelectedTeam(team)}
                        placeholder="Type a name to assign group member"
                        className="w-full"
                        classNamePrefix="select2-selection"
                        components={{
                          DropdownIndicator: () => null,
                          IndicatorSeparator: () => null,
                        }}
                      />
                    </div>

                    <div className="relative w-full py-2">
                      <p className="text-stone-500 dark:text-white">
                        Project name
                      </p>
                      <input
                        {...register("name", { required: "Name is required" })}
                        type="text"
                        id="projectName"
                        placeholder="Project Name"
                        className="w-full rounded-lg bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B] p-2 outline-none  shadow-sm sm:text-sm"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="relative w-full py-2">
                      <p className="text-stone-500 dark:text-white">
                        Project category
                      </p>
                      <input
                        {...register("category", {
                          required: "Category is required",
                        })}
                        type="text"
                        id="projectCategory"
                        placeholder="Project Category"
                        className="w-full rounded-lg bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B] p-2 outline-none  shadow-sm sm:text-sm"
                      />
                      {errors.category && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.category.message}
                        </p>
                      )}
                    </div>

                    <div className="mt-5 flex justify-between gap-2">
                      <button
                        disabled={isLoading}
                        onClick={closeModal}
                        type="button"
                        className={`w-full rounded-md lg:rounded-full py-1 lg:py-3 ${
                          isLoading
                            ? "opacity-50 cursor-not-allowed bg-gray-400"
                            : ""
                        } dark:text-white mx-auto outline-none border-2 text-sm`}
                      >
                        {isLoading ? "Loading..." : "Cancel"}
                      </button>
                      <button
                        disabled={isLoading}
                        type="submit"
                        className={`border w-full rounded-md lg:rounded-full py-1 lg:py-3 outline-none bg-blue-700 text-white text-md ${
                          isLoading
                            ? "opacity-50 cursor-not-allowed bg-gray-400"
                            : ""
                        }`}
                      >
                        {isLoading ? "Creating..." : "Create"}
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateProjectModal;
