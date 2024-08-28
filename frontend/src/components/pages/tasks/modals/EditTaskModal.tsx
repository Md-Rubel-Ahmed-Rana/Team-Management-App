import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateTaskMutation } from "@/features/task";
import toast from "react-hot-toast";

type IEditableTask = {
  id: string;
  name: string;
  deadline: string;
};

type Inputs = {
  name: string;
  deadline: string;
};

type Props = {
  task: IEditableTask;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const EditTaskModal = ({ isOpen, setIsOpen, task }: Props) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  const { register, handleSubmit } = useForm<Inputs>();
  const [updateTask, { isLoading }] = useUpdateTaskMutation();

  const handleCreateNewTask: SubmitHandler<Inputs> = async (data) => {
    const result: any = await updateTask({ ...data, id: task.id });
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      window.location.reload();
    } else {
      toast.error("Something went wrong to update task");
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
                    <h3 className="text-xl font-bold lg:mb-5">Edit task</h3>
                    <div className="relative w-full py-2">
                      <p className="text-stone-500 dark:text-white">
                        Task name
                      </p>
                      <input
                        {...register("name", { required: "Name is required" })}
                        type="text"
                        defaultValue={task.name}
                        id="taskName"
                        placeholder="Enter your task name (e.g: Develop API)"
                        className="w-full rounded-sm bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  lg:py-3 py-2 outline-none px-2 shadow-sm sm:text-sm"
                      />
                    </div>
                    <div className="relative w-full py-2">
                      <p className="text-stone-500 dark:text-white">
                        Task deadline
                      </p>
                      <input
                        {...register("deadline")}
                        type="text"
                        defaultValue={task.deadline}
                        id="deadline"
                        placeholder="Enter deadline (e.g: 3 hours/2 days/4 weeks)"
                        className="w-full rounded-sm bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  lg:py-3 py-2 outline-none px-2 shadow-sm sm:text-sm"
                      />
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
                        {isLoading ? "Saving..." : "Save changes"}
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

export default EditTaskModal;
