/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import { useDeleteTeamMutation } from "@/features/team";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import SmallLoader from "@/components/shared/SmallLoader";
import { SocketContext } from "@/context/SocketContext";

type Props = {
  teamId: string;
  teamName: string;
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
};

type FormValues = {
  typedTeamName: string;
  typedConfirmation: string;
};

const TeamDeleteModal = ({
  teamId,
  teamName,
  modalOpen,
  setModalOpen,
}: Props) => {
  const { socket }: any = useContext(SocketContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();
  const [deleteTeam, { isLoading }] = useDeleteTeamMutation();
  const router = useRouter();

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDelete = async (data: FormValues) => {
    const result: any = await deleteTeam(teamId);
    if (result?.data?.statusCode === 200) {
      console.log("1", result);
      console.log("2", result?.data);
      console.log("3", result?.data?.data);
      toast.success(result?.data?.message || "Team deleted successfully");
      result?.data?.data?.forEach((memberId: string) => {
        if (memberId) {
          socket.emit("notification", memberId);
        }
      });
      setModalOpen(false);
      router.reload();
    } else {
      setModalOpen(false);
      toast.error(
        result?.error?.message ||
          result?.data?.message ||
          result?.error?.data?.message ||
          "Team was not deleted"
      );
    }
  };

  const normalize = (str: string) => str?.replace(/\s+/g, " ").trim();
  const typedTeamName = watch("typedTeamName");
  const typedConfirmation = watch("typedConfirmation");
  const isFormValid =
    normalize(typedTeamName) === normalize(teamName) &&
    normalize(typedConfirmation) === "Delete My Team";

  return (
    <Transition appear show={modalOpen} as={Fragment}>
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
            <div className="w-[95vw] lg:w-[400px] mx-auto bg-white dark:bg-gray-400 dark:text-black rounded-xl p-6 text-left shadow-xl transition-all relative">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Team Deletion</h1>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <RxCross2 className="text-3xl text-blue-500" />
                </button>
              </div>
              <h3 className="text-lg font-semibold">{teamName}</h3>
              <div className="mb-4 text-sm text-red-600">
                Warning: Deleting this team will permanently remove all related
                projects and chats/messages. This action cannot be undone.
              </div>

              <form onSubmit={handleSubmit(handleDelete)}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Type the team name to confirm:
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-blue-500 bg-white text-gray-700"
                    placeholder="Enter team name"
                    {...register("typedTeamName", { required: true })}
                  />
                  {errors.typedTeamName && (
                    <span className="text-red-500 text-xs">
                      This field is required
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Type "Delete My Team" to confirm:
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-blue-500 bg-white text-gray-700"
                    placeholder="Delete My Team"
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
                    {isLoading ? (
                      <span className="flex items-center gap-1">
                        <small>Deleting...</small>
                        <SmallLoader />
                      </span>
                    ) : (
                      "Delete Team"
                    )}
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

export default TeamDeleteModal;
