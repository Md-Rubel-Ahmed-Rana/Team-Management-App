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

  const [createProject] = useCreateProjectMutation();

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

        <div className=" fixed inset-0 flex flex-col items-center justify-center">
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
              <Dialog.Panel className="lg:w-[400px] mx-auto transform rounded-xl bg-orange-50 dark:bg-gray-600 dark:text-white p-6 text-left  shadow-xl transition-all relative">
                <div className="mt-3">
                  <form onSubmit={handleSubmit(handleCreateNewProject)}>
                    <h3 className="text-xl font-bold mb-5">
                      Create a new project
                    </h3>
                    <div className="relative w-full py-2">
                      <p className="text-stone-500 dark:text-white mb-2 ">
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
                        className="mt-1 w-full"
                        classNamePrefix="select2-selection"
                        components={{
                          DropdownIndicator: () => null,
                          IndicatorSeparator: () => null,
                        }}
                      />
                    </div>
                    <div className="relative w-full py-2">
                      <p className="text-stone-500 dark:text-white mb-2">
                        Project name
                      </p>
                      <input
                        {...register("name", { required: "Name is required" })}
                        required
                        type="text"
                        id="teamName"
                        placeholder="Project Name"
                        className="w-full rounded-lg bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  py-3 outline-none px-2 shadow-sm sm:text-sm"
                      />
                    </div>
                    <div className="relative w-full py-2">
                      <p className="text-stone-500 dark:text-white mb-2">
                        Project category
                      </p>
                      <input
                        {...register("category", {
                          required: "category is required",
                        })}
                        required
                        type="text"
                        id="teamName"
                        placeholder="Project category"
                        className="w-full rounded-lg bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  py-3 outline-none px-2 shadow-sm sm:text-sm"
                      />
                    </div>

                    <div className="mt-5 lg:flex justify-between">
                      <button
                        onClick={closeModal}
                        type="button"
                        className="border-2 mb-4 lg:mb-0 mx-auto outline-none border-black rounded-full px-10 py-2  text-sm flex items-center gap-2"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="border mx-auto outline-none rounded-full px-10 py-2 bg-blue-700 text-white text-md flex items-center gap-2"
                      >
                        Continue
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
