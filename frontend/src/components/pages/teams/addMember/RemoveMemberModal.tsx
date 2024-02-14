/* eslint-disable @next/next/no-img-element */
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Select from "react-select";
import Swal from "sweetalert2";
import { IUser } from "@/interfaces/user.interface";
import customStyles from "@/utils/reactSelectCustomStyle";
import { useRemoveTeamMemberMutation } from "@/features/team";

const RemoveMemberModal = ({ isRemove, setIsRemove, team }: any) => {
  const [member, setMember] = useState({ label: "", value: "" });
  const [removeMember] = useRemoveTeamMemberMutation();

  const closeModal = () => {
    setIsRemove(false);
  };

  const handleRemoveMember = async () => {
    const result: any = await removeMember({
      teamId: team.id,
      memberId: member?.value,
    });
    console.log(result?.data?.success);
    console.log(result?.data?.message);
    if (result?.data?.success) {
      closeModal();
      Swal.fire({
        position: "center",
        icon: "success",
        title: result?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (!result?.error) {
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
              <Dialog.Panel className="lg:w-[400px] mx-auto transform rounded-xl bg-orange-50 dark:bg-gray-600 dark:text-white p-6 text-left  shadow-xl transition-all relative">
                <div className="mt-3">
                  <div>
                    <div className="relative w-full py-2">
                      <h3 className="text-2xl mb-2">
                        Remove member from group.
                      </h3>
                      <Select
                        options={team?.activeMembers?.map((user: IUser) => ({
                          value: user?.id,
                          label: user?.name,
                        }))}
                        styles={customStyles}
                        onChange={(user: any) => setMember(user)}
                        placeholder="Type a name to remove group member"
                        className="mt-1 w-full"
                        classNamePrefix="select2-selection"
                        components={{
                          DropdownIndicator: () => null,
                          IndicatorSeparator: () => null,
                        }}
                      />
                    </div>
                    <div className="mt-5 lg:flex justify-between">
                      <button
                        onClick={closeModal}
                        type="button"
                        className="border-2 mx-auto outline-none border-black hover:bg-gray-300 rounded-full px-10 py-2  text-sm flex items-center gap-2"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleRemoveMember}
                        type="button"
                        className="border mt-4 lg:mt-0 mx-auto outline-none rounded-full px-10 py-2 bg-blue-600 hover:bg-blue-700 text-white text-md flex items-center gap-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RemoveMemberModal;
