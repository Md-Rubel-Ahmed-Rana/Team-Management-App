import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import Select from "react-select";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import { useGetSingleProjectQuery } from "@/features/project";
import { INewTask } from "@/interfaces/task.interface";
import { useCreateTaskMutation } from "@/features/task";
import customStyles from "@/utils/reactSelectCustomStyle";
import { SocketContext } from "@/context/SocketContext";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const CreateTaskModal = ({ isOpen, setIsOpen, project, status }: any) => {
  const { socket }: any = useContext(SocketContext);
  const router = useRouter();
  const closeModal = () => {
    setIsOpen(false);
  };
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: projectData }: any = useGetSingleProjectQuery(project?.id);
  const members = projectData?.data?.members;
  const [selectedMember, setSelectedMember] = useState<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewTask>();
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const handleCreateNewTask: SubmitHandler<INewTask> = async (data) => {
    data.assignedTo = selectedMember?.value;
    data.assignedBy = user.id;
    data.status = status;
    data.project = project.id;
    const result: any = await createTask(data);
    if (result?.data?.success) {
      socket.emit("task", result?.data?.data);
      socket.emit("notification", selectedMember?.value);
      toast.success(result?.data?.message);
      closeModal();
      router.reload();
    } else {
      toast.error(
        result?.data?.message || "Something went wrong to create task"
      );
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
              <Dialog.Panel className="lg:w-[400px] mx-auto transform rounded-xl bg-orange-50 dark:bg-gray-600 lg:p-6 p-3 text-left  shadow-xl transition-all relative">
                <div className="mt-3">
                  <form onSubmit={handleSubmit(handleCreateNewTask)}>
                    <h3 className="text-xl font-bold lg:mb-5">
                      Create a new task for {status}
                    </h3>
                    <div className="relative w-full py-2">
                      <p className="text-stone-500 dark:text-white">
                        Select a member
                      </p>
                      <Select
                        required
                        options={
                          members &&
                          members?.map((member: any) => ({
                            value: member?.id,
                            label: member?.name,
                          }))
                        }
                        styles={customStyles}
                        onChange={(user: any) => setSelectedMember(user)}
                        placeholder="Type a name of member"
                        className="w-full"
                        classNamePrefix="select2-selection"
                        noOptionsMessage={({ inputValue }: any) =>
                          !inputValue &&
                          `No members in your project: "${project?.name}". Please add member then assign task`
                        }
                        components={{
                          DropdownIndicator: () => null,
                          IndicatorSeparator: () => null,
                        }}
                      />
                    </div>
                    <div className="relative w-full py-2">
                      <p className="text-stone-500 dark:text-white">
                        Task name
                      </p>
                      <input
                        {...register("name", {
                          required: "Task name is required",
                        })}
                        required
                        type="text"
                        id="taskName"
                        placeholder="Enter your task name (e.g: Develop API)"
                        className="w-full rounded-sm bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  lg:py-3 py-2 outline-none px-2 shadow-sm sm:text-sm"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="relative w-full py-2">
                      <p className="text-stone-500 dark:text-white">
                        Task deadline
                      </p>
                      <input
                        {...register("deadline", {
                          required: "Task deadline is required",
                        })}
                        type="text"
                        id="deadline"
                        placeholder="Enter deadline (e.g: 3 hours/2 days/4 weeks)"
                        className="w-full rounded-sm bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  lg:py-3 py-2 outline-none px-2 shadow-sm sm:text-sm"
                      />
                      {errors.deadline && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.deadline.message}
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
                        {isLoading ? "Adding..." : "Add Task"}
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

export default CreateTaskModal;
