import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Select from "react-select";
import Swal from "sweetalert2";
import { useRemoveMemberMutation } from "@/features/project";
import { useGetActiveMembersQuery } from "@/features/team";
import { IUser } from "@/interfaces/user.interface";
import customStyles from "@/utils/reactSelectCustomStyle";

type Props = {
  isRemove: boolean;
  setIsRemove: (state: boolean) => void;
  projectId: string;
  team: any;
};

const RemoveMemberFromProject = ({
  isRemove,
  setIsRemove,
  projectId,
  team,
}: Props) => {
  const closeModal = () => {
    setIsRemove(false);
  };

  const [removeMember, { isLoading }] = useRemoveMemberMutation();
  const [newMember, setNewMember] = useState({ label: "", value: "" });
  const { data: memberData } = useGetActiveMembersQuery(team?.id);
  const members = memberData?.data?.map((member: IUser) => ({
    value: member?.id,
    label: member?.name,
  }));

  const handleRemoveMember = async (e: any) => {
    e.preventDefault();

    const memberData = {
      projectId,
      memberId: newMember.value,
    };

    const result: any = await removeMember(memberData);

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
    <Transition appear show={isRemove} as={Fragment}>
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
                  <form onSubmit={handleRemoveMember}>
                    <h3 className="text-md lg:text-xl font-bold">
                      Remove member from this project
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
                        className="w-full"
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
                        {isLoading ? "Removing..." : "Remove Member"}
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

export default RemoveMemberFromProject;
