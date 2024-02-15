import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import Select from "react-select";
import { SubmitHandler, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import { useGetSingleProjectQuery } from "@/features/project";
import { INewTask } from "@/interfaces/task.interface";
import { useCreateTaskMutation } from "@/features/task";
import customStyles from "@/utils/reactSelectCustomStyle";
import { SocketContext } from "@/context/SocketContext";

const CreateTaskModal = ({ isOpen, setIsOpen, project, status }: any) => {
  const { socket }: any = useContext(SocketContext);
  const closeModal = () => {
    setIsOpen(false);
  };
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: projectData }: any = useGetSingleProjectQuery(project?.id);
  const members = projectData?.data?.members;
  const [selectedMember, setSelectedMember] = useState<any>();
  const { register, handleSubmit } = useForm<INewTask>();
  const [createTask] = useCreateTaskMutation();

  const handleCreateNewTask: SubmitHandler<INewTask> = async (data) => {
    data.assignedTo = selectedMember?.value;
    data.assignedBy = user.id;
    data.status = status;
    data.project = project.id;
    const result: any = await createTask(data);
    if (result?.data?.success) {
      // window.location.reload();
      socket.emit("task", result?.data?.data?.data);
      socket.emit("notification", result?.data?.data?.notification);
      Swal.fire({
        position: "center",
        icon: "success",
        text: result?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      closeModal();
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        text: result?.data?.message || "Something went wrong to create task",
        showConfirmButton: true,
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
              <Dialog.Panel className="lg:w-[400px] mx-auto transform rounded-xl bg-orange-50 dark:bg-gray-600 p-6 text-left  shadow-xl transition-all relative">
                <div className="mt-3">
                  <form onSubmit={handleSubmit(handleCreateNewTask)}>
                    <h3 className="text-xl font-bold mb-5">
                      Create a new task for {status}
                    </h3>
                    <div className="relative w-full py-2">
                      <p className="text-stone-500 dark:text-white mb-2 ">
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
                        placeholder="Type a name to assign a task to member"
                        className="mt-1 w-full"
                        classNamePrefix="select2-selection"
                        noOptionsMessage={({ inputValue }: any) =>
                          !inputValue &&
                          `No members in your project: ${project?.name}. Please add member then assign task`
                        }
                        components={{
                          DropdownIndicator: () => null,
                          IndicatorSeparator: () => null,
                        }}
                      />
                    </div>
                    <div className="relative w-full py-2">
                      <p className="text-stone-500 dark:text-white mb-2">
                        Task name
                      </p>
                      <input
                        {...register("name", { required: "Name is required" })}
                        required
                        type="text"
                        id="taskName"
                        placeholder="Enter your task name (e.g: Develop API)"
                        className="w-full rounded-lg bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  py-3 outline-none px-2 shadow-sm sm:text-sm"
                      />
                    </div>
                    <div className="relative w-full py-2">
                      <p className="text-stone-500 dark:text-white mb-2">
                        Task deadline
                      </p>
                      <input
                        {...register("deadline")}
                        required
                        type="text"
                        id="deadline"
                        placeholder="Enter deadline (e.g: 3 hours/2 days/4 weeks)"
                        className="w-full rounded-lg bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  py-3 outline-none px-2 shadow-sm sm:text-sm"
                      />
                    </div>

                    <div className="mt-5 lg:flex justify-between">
                      <button
                        onClick={closeModal}
                        type="button"
                        className="border-2 mb-4 lg:mb-0 dark:text-white mx-auto outline-none border-black rounded-full px-10 py-2  text-sm flex items-center gap-2"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="border mx-auto outline-none rounded-full px-10 py-2 bg-blue-700 text-white text-md flex items-center gap-2"
                      >
                        Create
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
