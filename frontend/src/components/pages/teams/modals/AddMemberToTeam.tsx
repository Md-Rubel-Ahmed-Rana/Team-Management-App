/* eslint-disable @next/next/no-img-element */
import { useState, Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Select from "react-select";
import { useGetUsersQuery } from "@/features/user";
import { useSendInvitationMutation } from "@/features/invitation";
import { IUser } from "@/interfaces/user.interface";
import customStyles from "@/utils/reactSelectCustomStyle";
import { SocketContext } from "@/context/SocketContext";
import { ITeam } from "@/interfaces/team.interface";
import toast from "react-hot-toast";

type ISelectType = { label: string; value: string };

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  team: ITeam;
};

const AddMemberToTeam = ({ isOpen, setIsOpen, team }: Props) => {
  const { socket }: any = useContext(SocketContext);
  const [newMember, setNewMember] = useState({ label: "", value: "" });
  const [page, setPage] = useState(1);
  const { data: users } = useGetUsersQuery([]);
  const [sendInvitation] = useSendInvitationMutation();

  const remainingUsers = users?.data?.filter((user: any) => {
    const isInActive = team?.activeMembers?.some(
      (member: any) => member?.id === user?.id
    );

    const isInPending = team?.pendingMembers?.some(
      (member: any) => member?.id === user?.id
    );

    // Check if the user is the admin
    const isAdmin = team?.admin?.id === user?.id;

    return !isInActive && !isInPending && !isAdmin;
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleAddNewMember = (user: ISelectType) => {
    setNewMember(user);
  };

  const selectedMember = users?.data.find(
    (usr: IUser) => usr.id === newMember?.value
  );

  const handleSendInvitation = async () => {
    const result: any = await sendInvitation({
      teamId: team?.id,
      memberId: selectedMember?.id,
    });
    if (result?.data?.success) {
      closeModal();
      toast.success(result?.data?.message || "Team invitation has been sent!");
      // send invitation notification
      socket.emit("notification", selectedMember?.id);
    } else {
      toast.error(result?.data?.message || "Failed send team invitation");
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

        <div className="fixed inset-0 flex flex-col items-center justify-center">
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
              <Dialog.Panel className="w-[95vw] lg:w-[400px] h-auto mx-auto transform rounded-xl bg-orange-50 dark:bg-gray-600 p-2 lg:p-6 text-left  shadow-xl transition-all relative">
                {/* modal content */}
                <div className="mt-3">
                  {page === 1 && (
                    <>
                      <div>
                        <h3 className="text-md lg:text-xl font-bold mb-2">
                          Assign new member
                        </h3>
                        <h5 className=" text-md lg:text-lg font-semibold text-stone-400">
                          Group member can
                        </h5>
                        <ul className="font-semibold mt-3">
                          <li>1. Identify skills needed.</li>
                          <li>2. Define clear role.</li>
                          <li>3. Assign a leader.</li>
                          <li>4. Set clear goal.</li>
                        </ul>
                      </div>
                      <div className="mt-5 flex justify-between items-center gap-2 text-center">
                        <button
                          onClick={closeModal}
                          type="button"
                          className="border mx-auto outline-none rounded-full px-3 w-full    py-2  text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => setPage((prev) => prev + 1)}
                          type="button"
                          className="border mx-auto outline-none rounded-full px-3 w-full   py-2 bg-blue-700 text-white text-md"
                        >
                          {page === 1 ? "Continue" : "Add Member"}
                        </button>
                      </div>
                    </>
                  )}
                  {page === 2 && (
                    <div>
                      <h3 className="text-md lg:text-lg font-bold mb-5">
                        Who do you want to add new members
                      </h3>
                      <div className="relative w-full py-2">
                        <p className="text-stone-500 mb-2">
                          Add new member to join group.
                        </p>
                        <Select
                          options={remainingUsers?.map((user: IUser) => ({
                            value: user?.id,
                            label: user?.name,
                          }))}
                          styles={customStyles}
                          onChange={(user: any) => handleAddNewMember(user)}
                          placeholder="Type a member name"
                          className="mt-1 w-full"
                          classNamePrefix="select2-selection"
                          components={{
                            DropdownIndicator: () => null,
                            IndicatorSeparator: () => null,
                          }}
                        />
                        {selectedMember && (
                          <div className="my-5 flex items-center gap-5 bg-gray-100 px-3 py-2 rounded-md">
                            <div className="flex justify-center items-center bg-gray-400 rounded-full">
                              {selectedMember?.profile_picture ? (
                                <img
                                  className="w-14 h-14 rounded-full"
                                  src={selectedMember?.profile_picture}
                                  alt=""
                                />
                              ) : (
                                <div className="flex justify-center items-center w-12 h-12 bg-gray-400 rounded-full">
                                  <h4>{selectedMember?.name.slice(0, 1)}</h4>
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="text-lg font-bold">
                                {selectedMember?.name}
                              </h4>
                              <p className="text-sm text-stone-400">
                                {selectedMember?.email}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="mt-5 flex justify-between gap-2">
                        <button
                          onClick={closeModal}
                          type="button"
                          className="border-2  w-full  hover:bg-gray-300 rounded-full px-3 py-2  text-sm "
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSendInvitation}
                          type="button"
                          className="border outline-none rounded-full px-3 w-full  py-2 bg-blue-600 hover:bg-blue-700 text-white text-md"
                        >
                          Invite
                        </button>
                      </div>
                    </div>
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

export default AddMemberToTeam;
