/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDeleteProjectMutation } from "@/features/project";
import SmallLoader from "@/components/shared/SmallLoader";
import { SocketContext } from "@/context/SocketContext";

type Props = {
  projectId: string;
  projectName: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

type FormValues = {
  typedProjectName: string;
  typedConfirmation: string;
};

const ProjectDeleteModal = ({
  projectId,
  projectName,
  isOpen,
  setIsOpen,
}: Props) => {
  const { socket }: any = useContext(SocketContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const [deleteProject, { isLoading }] = useDeleteProjectMutation();

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = async (data: FormValues) => {
    const result: any = await deleteProject(projectId);
    if (result?.data?.statusCode === 200) {
      result?.data?.data?.forEach((memberId: string) => {
        if (memberId) {
          socket.emit("notification", memberId);
        }
      });
      toast.success(result?.data?.message || "Project deleted successfully");
      setIsOpen(false);
    } else {
      setIsOpen(false);
      toast.error(result?.error?.message || "Project was not deleted");
    }
  };

  const typedProjectName = watch("typedProjectName");
  const typedConfirmation = watch("typedConfirmation");
  const isFormValid =
    typedProjectName === projectName &&
    typedConfirmation === "Delete My Project";

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="lg:w-[400px] w-[300px] bg-white dark:bg-gray-400 dark:text-black rounded-xl lg:p-6 p-3 text-left shadow-xl transition-all relative">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">
                  Delete {`'${projectName}'`}
                </h1>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <RxCross2 />
                </button>
              </div>

              <div className="mb-4 text-sm text-red-600">
                Warning: Deleting this project will permanently remove all
                related tasks. This action cannot be undone.
              </div>

              <form onSubmit={handleSubmit(handleDelete)}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Type the team name to confirm:
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-blue-500 bg-white text-gray-700"
                    placeholder="Enter project name"
                    {...register("typedProjectName", { required: true })}
                  />
                  {errors.typedProjectName && (
                    <span className="text-red-500 text-xs">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Type "Delete My Project" to confirm:
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-blue-500 bg-white text-gray-700"
                    placeholder="Delete My Project"
                    {...register("typedConfirmation", { required: true })}
                  />
                  {errors.typedConfirmation && (
                    <span className="text-red-500 text-xs">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`px-4 py-2 rounded ${
                      isFormValid
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {isLoading ? <SmallLoader /> : "Delete Project"}
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProjectDeleteModal;
