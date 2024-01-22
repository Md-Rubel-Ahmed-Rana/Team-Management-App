import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useLoggedInUserQuery } from "../../features/user/userApi";
import customStyles from "../../utils/reactSelectCustomStyle";
import Select from "react-select";
import { IUser } from "../../interfaces/user.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { INewTask } from "../../interfaces/task.interface";
import { useGetSingleProjectQuery } from "../../features/project/projectApi";
import { useCreateTaskMutation } from "../../features/task/taskApi";
import Swal from "sweetalert2";

const CreateTaskModal = ({ isOpen, setIsOpen, project, task }: any) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: projectData }: any = useGetSingleProjectQuery(project?._id);
  const members = projectData?.data?.members;
  const [selectedMember, setSelectedMember] = useState<any>();
  const { register, handleSubmit } = useForm<INewTask>();
  const [createTask] = useCreateTaskMutation();

  const handleCreateNewTask: SubmitHandler<INewTask> = async (data) => {
    data.assignedMember = selectedMember?.value;
    data.assignedBy = user._id;
    data.status = task;
    data.projectId = project._id;
    const result: any = await createTask(data);
    if (result?.data?.success) {
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
              <Dialog.Panel className="lg:w-[400px] mx-auto transform rounded-xl bg-orange-50 p-6 text-left  shadow-xl transition-all relative">
                <div className="mt-3">
                  <form onSubmit={handleSubmit(handleCreateNewTask)}>
                    <h3 className="text-xl font-bold mb-5">
                      Create a new task for {task}
                    </h3>
                    <div className="relative w-full py-2">
                      <p className="text-stone-500 mb-2 ">Select a member</p>
                      <Select
                        options={
                          members &&
                          members?.map((member: any) => ({
                            value: member?.member?._id,
                            label: member?.member?.name,
                          }))
                        }
                        styles={customStyles}
                        onChange={(user: any) => setSelectedMember(user)}
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
                      <p className="text-stone-500 mb-2">Task name</p>
                      <input
                        {...register("name", { required: "Name is required" })}
                        required
                        type="text"
                        id="taskName"
                        placeholder="Task Name"
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
