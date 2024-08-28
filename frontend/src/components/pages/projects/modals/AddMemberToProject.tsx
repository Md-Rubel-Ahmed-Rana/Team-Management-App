import React, { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Select from "react-select";
import Swal from "sweetalert2";
import { useAddMemberMutation } from "@/features/project";
import { useGetActiveMembersQuery, useSingleTeamQuery } from "@/features/team";
import { IUser } from "@/interfaces/user.interface";
import customStyles from "@/utils/reactSelectCustomStyle";
import { SocketContext } from "@/context/SocketContext";

type Props = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  projectId: string;
  teamId: string;
};

const AddMemberToProject = ({
  isOpen,
  setIsOpen,
  projectId,
  teamId,
}: Props) => {
  const { socket }: any = useContext(SocketContext);
  const closeModal = () => {
    setIsOpen(false);
  };

  const [addNewMember, { isLoading }] = useAddMemberMutation();
  const [newMember, setNewMember] = useState({ label: "", value: "" });
  const { data: singleTeam } = useSingleTeamQuery(teamId);
  const team = singleTeam?.data;
  const { data: memberData } = useGetActiveMembersQuery(teamId);
  console.log({ projectId, teamId, singleTeam, memberData });
  const members = memberData?.data?.activeMembers?.map((member: IUser) => ({
    value: member?.id,
    label: member?.name,
  }));

  const handleAddNewMember = async (e: any) => {
    e.preventDefault();

    const memberData = {
      projectId,
      memberId: newMember.value,
    };

    const result: any = await addNewMember(memberData);

    if (result?.data?.success) {
      socket.emit("notification", result?.data?.data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: result?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
      closeModal();
    }
    if (result?.error) {
      Swal.fire({
        position: "center",
        icon: "error",
        text: result?.error?.data?.message,
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
              <Dialog.Panel className="lg:w-[400px] w-[300px] mx-auto transform rounded-xl bg-orange-50 dark:bg-gray-600 lg:p-6 p-3 text-left  shadow-xl transition-all relative">
                <div className="mt-3">
                  <form onSubmit={handleAddNewMember}>
                    <h3 className="text-lg lg:text-xl font-bold mb-2">
                      Add member to this project
                    </h3>
                    <div className="relative w-full py-2">
                      <p className="text-stone-500 dark:text-white">
                        Select a member
                      </p>
                      <Select
                        required
                        options={members}
                        styles={customStyles}
                        onChange={(user: any) => setNewMember(user)}
                        placeholder="Type a name of member"
                        className="mt-1 w-full"
                        classNamePrefix="select2-selection"
                        noOptionsMessage={({ inputValue }: any) =>
                          !inputValue &&
                          `No active members in your team: ${team?.name}. Please invite members to join your team`
                        }
                        components={{
                          DropdownIndicator: () => null,
                          IndicatorSeparator: () => null,
                        }}
                      />
                    </div>
                    <div className="mt-5 flex justify-between gap-2">
                      <button
                        disabled={isLoading}
                        onClick={closeModal}
                        type="button"
                        className={`w-full rounded-full lg:rounded-full py-1 lg:py-3 ${
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
                        className={`border w-full rounded-full lg:rounded-full py-1 lg:py-3 outline-none bg-blue-700 text-white text-md ${
                          isLoading
                            ? "opacity-50 cursor-not-allowed bg-gray-400"
                            : ""
                        }`}
                      >
                        {isLoading ? "Adding..." : "Add Member"}
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

export default AddMemberToProject;
