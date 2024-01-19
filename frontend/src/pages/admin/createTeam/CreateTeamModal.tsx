import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { useCreateTeamMutation } from "../../../features/team/teamApi";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const CreateTeamModal = ({ isOpen, setIsOpen }: any) => {
  const user: any = useAppSelector((state) => state.user.user);

  const closeModal = () => {
    setIsOpen(false);
  };
  const [page, setPage] = useState(1);
  const [teamName, setTeamName] = useState("");
  const [teamCategory, setTeamCategory] = useState("");
  const navigate = useNavigate();
  const [createTeam] = useCreateTeamMutation();
  const team = {
    name: teamName,
    category: teamCategory,
    admin: user._id || user.id,
  };

  const handleCreateTeamName = () => {
    if (!teamName) {
      setPage(1);
      toast.error("Team name is required");
    } else {
      setPage((prev) => prev + 1);
    }
  };

  const handleCreateTeamCategory = async (e: any) => {
    e.preventDefault();
    if (!teamCategory) {
      setPage(2);
      return toast.error("Team category is required");
    }

    const result: any = await createTeam(team);
    if (result?.data?.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: result?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/add-members");
    }
    if (!result?.data?.success) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: result?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
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
                {/* modal content */}
                <div className="mt-3">
                  {page === 1 && (
                    <form onSubmit={handleCreateTeamName}>
                      <h3 className="text-xl font-bold mb-5">
                        Create a new team
                      </h3>
                      <div className="relative w-full py-2">
                        <p className="text-stone-500 mb-2">Team name</p>
                        <input
                          required
                          onChange={(e) => setTeamName(e.target.value)}
                          type="text"
                          id="teamName"
                          placeholder="Team Name"
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
                  )}
                  {page === 2 && (
                    <form onSubmit={handleCreateTeamCategory}>
                      <h3 className="text-xl font-bold mb-5">Team category</h3>
                      <div className="relative w-full py-2">
                        <p className="text-stone-500 mb-2">Team title</p>
                        <input
                          required
                          onChange={(e) => setTeamCategory(e.target.value)}
                          type="text"
                          id="teamTitle"
                          placeholder="Team title"
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
                  )}
                  {/* {page < 3 && (
                    <div className="mt-5 flex justify-between">
                      <button
                        onClick={closeModal}
                        type="button"
                        className="border-2 outline-none border-black rounded-full px-10 py-2  text-sm flex items-center gap-2"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setPage((prev) => prev + 1)}
                        type="button"
                        className="border outline-none rounded-full px-10 py-2 bg-blue-700 text-white text-md flex items-center gap-2"
                      >
                        Continue
                      </button>
                    </div>
                  )} */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateTeamModal;
