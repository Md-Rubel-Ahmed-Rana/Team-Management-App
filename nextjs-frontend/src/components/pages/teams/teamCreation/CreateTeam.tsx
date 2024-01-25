/* eslint-disable @next/next/no-img-element */
import { useCreateTeamMutation } from "@/features/team/teamApi";
import { useLoggedInUserQuery } from "@/features/user/userApi";
import useUploadFile from "@/hooks/useUploadFile";
import { ITeam } from "@/interfaces/team.interface";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const CreateTeamModal = ({ isOpen, setIsOpen }: any) => {
  const { data }: any = useLoggedInUserQuery({});
  const user = data?.data;
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [createTeam] = useCreateTeamMutation();
  const uploadFile = useUploadFile();

  const [teamData, setTeamData] = useState<Partial<ITeam>>({
    name: "",
    image: "",
    category: "",
    description: "",
    admin: user?._id || user?.id,
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const handlePageOne = () => {
    if (teamData?.name === "" && teamData.image === "") {
      setPage(1);
      return toast.error("Team name and image are required");
    } else {
      setPage((prev) => prev + 1);
    }
  };

  const handleFileChange = async (e: any) => {
    const selectedFile = e.target.files[0];
    const uploadedFile: any = await uploadFile(selectedFile);
    setTeamData((prev) => ({
      ...prev,
      image: uploadedFile?.url,
    }));
  };

  const handleCreateTeamCategory = async (e: any) => {
    e.preventDefault();
    if (!teamData.category && !teamData.description) {
      setPage(2);
      return toast.error("Team category and description are required");
    }

    const result: any = await createTeam(teamData);
    if (result?.data?.success) {
      closeModal();
      Swal.fire({
        position: "center",
        icon: "success",
        title: result?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/teams");
    }
    if (result?.error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: result?.error?.data?.message,
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
                    <form onSubmit={handlePageOne}>
                      <h3 className="text-xl font-bold mb-5">
                        Create a new team
                      </h3>
                      <div className="relative w-full py-2">
                        <p className="text-stone-500 mb-2">Team name</p>
                        <input
                          defaultValue={teamData.name}
                          required
                          onChange={(e) =>
                            setTeamData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          type="text"
                          id="teamName"
                          placeholder="Team Name"
                          className="w-full rounded-lg bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  py-3 outline-none px-2 shadow-sm sm:text-sm"
                        />
                      </div>
                      <div className="relative w-full py-2">
                        {teamData.image && (
                          <div className="w-full flex justify-between items-center rounded-lg bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  py-3 outline-none px-2 shadow-sm sm:text-sm">
                            <h4>Team image</h4>
                            <img
                              className="w-14 h-14 rounded-full"
                              src={teamData.image}
                              alt=""
                            />
                          </div>
                        )}
                        {!teamData.image && (
                          <div>
                            <p className="text-stone-500 mb-2">Team image</p>
                            <input
                              aria-label="Profile Image"
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="w-full rounded-lg bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  py-3 outline-none px-2 shadow-sm sm:text-sm"
                            />
                          </div>
                        )}
                      </div>
                      <div className="mt-5 lg:flex justify-between">
                        <button
                          disabled
                          type="button"
                          className="border-2 cursor-not-allowed mb-4 lg:mb-0 mx-auto outline-none border-black rounded-full px-10 py-2  text-sm flex items-center gap-2"
                        >
                          Back
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
                      <div className="relative w-full py-2">
                        <p className="text-stone-500 mb-2">Team category</p>
                        <input
                          required
                          onChange={(e) =>
                            setTeamData((prev) => ({
                              ...prev,
                              category: e.target.value,
                            }))
                          }
                          defaultValue={teamData.category}
                          type="text"
                          id="teamTitle"
                          placeholder="Category (Digital Generation)"
                          className="w-full rounded-lg bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  py-3 outline-none px-2 shadow-sm sm:text-sm"
                        />
                      </div>
                      <div className="relative w-full py-2">
                        <p className="text-stone-500 mb-2">Team description</p>
                        <textarea
                          rows={5}
                          required
                          onChange={(e) =>
                            setTeamData((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          defaultValue={teamData.description}
                          id="teamTitle"
                          placeholder="Description (Grow Your Team With Ease: Effortlessly Add Members For Increase Performance And Achievement)"
                          className="w-full rounded-lg bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  py-3 outline-none px-2 shadow-sm sm:text-sm"
                        />
                      </div>
                      <div className="mt-5 lg:flex justify-between">
                        <button
                          onClick={() => setPage((prev) => prev - 1)}
                          type="button"
                          className="border-2 mb-4 lg:mb-0 mx-auto outline-none border-black rounded-full px-10 py-2  text-sm flex items-center gap-2"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="border mx-auto outline-none rounded-full px-10 py-2 bg-blue-700 text-white text-md flex items-center gap-2"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  )}
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
