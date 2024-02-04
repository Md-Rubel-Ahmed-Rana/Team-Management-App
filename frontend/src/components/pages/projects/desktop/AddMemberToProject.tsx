import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Select from "react-select";
import Swal from "sweetalert2";
import { useAddMemberMutation } from "@/features/project";
import { useGetActiveMembersQuery } from "@/features/team";
import { IUser } from "@/interfaces/user.interface";
import customStyles from "@/utils/reactSelectCustomStyle";
import { projectMemberRoles } from "@/constants/projectMemberRoles";

type Props = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  projectId: string;
  team: any;
};

const AddMemberToProject = ({ isOpen, setIsOpen, projectId, team }: Props) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  const [addNewMember] = useAddMemberMutation();
  const [newMember, setNewMember] = useState({ label: "", value: "" });
  const [role, setRole] = useState("");
  const { data: memberData } = useGetActiveMembersQuery(team?._id);
  const members = memberData?.data?.map((member: IUser) => ({
    value: member?._id,
    label: member?.name,
  }));

  const handleAddNewMember = async (e: any) => {
    e.preventDefault();

    const memberData = {
      projectId,
      memberId: newMember.value,
      role,
    };

    const result: any = await addNewMember(memberData);

    if (result?.data?.success) {
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
              <Dialog.Panel className="lg:w-[400px] mx-auto transform rounded-xl bg-orange-50 p-6 text-left  shadow-xl transition-all relative">
                <div className="mt-3">
                  <form onSubmit={handleAddNewMember}>
                    <h3 className="text-xl font-bold mb-5">
                      Add member to this project
                    </h3>
                    <div className="relative w-full py-2">
                      <p className="text-stone-500 mb-2 ">Select a member</p>
                      <Select
                        required
                        options={members}
                        styles={customStyles}
                        onChange={(user: any) => setNewMember(user)}
                        placeholder="Type a name to assign a member to project"
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
                    <div className="relative w-full py-2">
                      <p className="text-stone-500 mb-2">Assign a role</p>
                      <Select
                        required
                        options={projectMemberRoles?.map((role) => ({
                          label: role,
                          value: role,
                        }))}
                        styles={customStyles}
                        onChange={(role: any) => setRole(role?.value)}
                        placeholder="Type a name to assign a member to project"
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
                      {/* <input
                        required
                        type="text"
                        id="role"
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Role: manager, leader, developer, designer etc"
                        className="w-full rounded-lg bg-transparent border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  py-3 outline-none px-2 shadow-sm sm:text-sm"
                      /> */}
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
                        Add
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
