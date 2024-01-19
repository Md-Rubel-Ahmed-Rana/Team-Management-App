import { useState, Fragment, SetStateAction, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import customStyles from "../../../utils/reactSelectCustomStyle";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../../../features/user/userApi";
import { useSendInvitationMutation } from "../../../features/invitation/invitationApi";
import Swal from "sweetalert2";
import { useAppSelector } from "../../../redux/hooks";
import { useGetTeamsQuery } from "../../../features/team/teamApi";
import { SocketContext } from "../../../context/SocketContext";

type IUser = {
  name: string;
  email: string;
  image: string;
};

type ISelectType = { label: string; value: string };

const AddMemberModal = ({ isOpen, setIsOpen }: SetStateAction<any>) => {
  const [newMember, setNewMember] = useState({ label: "", value: "" });
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data: users } = useGetUsersQuery([]);
  const [sendInvitation] = useSendInvitationMutation();
  const userId: any = useAppSelector((state) => state.user.user);
  const { data } = useGetTeamsQuery(userId?._id);
  const team = data?.data[data?.data.length - 1];
  const socket: any = useContext(SocketContext);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleAddNewMember = (user: ISelectType) => {
    setNewMember(user);
  };
  const selectedMember = users?.data.find(
    (usr: any) => usr.username === newMember?.value
  );

  const invitation = {
    team: team?._id,
    user: selectedMember?._id,
  };

  const handleSendInvitation = async () => {
    socket.emit("sendNotification", team?._id);
    const result: any = await sendInvitation(invitation);
    if (result?.data?.success) {
      // send the invitation notification to the user
      closeModal();
      Swal.fire({
        position: "center",
        icon: "success",
        title: result?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/team-members");
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
              <Dialog.Panel className="lg:w-[400px] mx-auto transform rounded-xl bg-orange-50 p-6 text-left  shadow-xl transition-all relative">
                {/* modal content */}
                <div className="mt-3">
                  {page === 1 && (
                    <>
                      <div>
                        <h3 className="text-xl font-bold mb-8">
                          Assign new member
                        </h3>
                        <h5 className="text-lg font-semibold text-stone-400">
                          Group member can
                        </h5>
                        <ul className="font-semibold mt-3">
                          <li>1. Identify skills needed.</li>
                          <li>2. Define clear role.</li>
                          <li>3. Assign a leader.</li>
                          <li>4. Set clear goal.</li>
                        </ul>
                      </div>
                      <div className="mt-5  lg:flex justify-between">
                        <button
                          onClick={closeModal}
                          type="button"
                          className="border-2 mx-auto outline-none border-black rounded-full px-10 py-2  text-sm flex items-center gap-2"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => setPage((prev) => prev + 1)}
                          type="button"
                          className="border mx-auto mt-4 lg:mt-0 outline-none rounded-full px-10 py-2 bg-blue-700 text-white text-md flex items-center gap-2"
                        >
                          {page === 1 ? "Continue" : "Add Member"}
                        </button>
                      </div>
                    </>
                  )}
                  {page === 2 && (
                    <div>
                      <h3 className="text-lg font-bold mb-5">
                        Who do you want to add new members
                      </h3>
                      <div className="relative w-full py-2">
                        <p className="text-stone-500 mb-2">
                          Add new member to join group.
                        </p>
                        <Select
                          options={
                            users?.data &&
                            users?.data?.map((user: any) => ({
                              value: user?.username,
                              label: user?.username,
                            }))
                          }
                          styles={customStyles}
                          onChange={(user: any) => handleAddNewMember(user)}
                          placeholder="Type a name to assign group member"
                          className="mt-1 w-full"
                          classNamePrefix="select2-selection"
                          components={{
                            DropdownIndicator: () => null,
                            IndicatorSeparator: () => null,
                          }}
                        />
                        {selectedMember && (
                          <div className="my-5 flex items-center gap-5 ">
                            <div className="flex justify-center items-center w-12 h-12 bg-gray-400 rounded-full">
                              {selectedMember?.image ? (
                                <img
                                  className="w-full"
                                  src={selectedMember?.image}
                                  alt=""
                                />
                              ) : (
                                <div className="flex justify-center items-center w-12 h-12 bg-gray-400 rounded-full">
                                  <h4>
                                    {selectedMember?.username.slice(0, 1)}
                                  </h4>
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="text-lg font-bold">
                                {selectedMember?.username}
                              </h4>
                              <p className="text-sm text-stone-400">
                                {selectedMember?.email}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="mt-5 lg:flex justify-between">
                        <button
                          onClick={closeModal}
                          type="button"
                          className="border-2 mx-auto outline-none border-black rounded-full px-10 py-2  text-sm flex items-center gap-2"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSendInvitation}
                          type="button"
                          className="border mt-4 lg:mt-0 mx-auto outline-none rounded-full px-10 py-2 bg-blue-700 text-white text-md flex items-center gap-2"
                        >
                          Add Member
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

export default AddMemberModal;
