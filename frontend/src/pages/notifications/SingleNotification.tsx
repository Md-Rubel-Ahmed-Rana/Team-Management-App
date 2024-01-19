import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useGetUserQuery } from "../../features/user/userApi";
import { useGetPendingMembersQuery } from "../../features/team/teamApi";
import { useAppSelector } from "../../redux/hooks";
import {
  useAcceptInvitationMutation,
  useRejectInvitationMutation,
} from "../../features/invitation/invitationApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SingleNotification = ({ openModal, setOpanModal, notification }: any) => {
  const closeModal = () => {
    setOpanModal(false);
  };
  const user: any = useAppSelector((state) => state.user.user);
  const { data } = useGetUserQuery(notification?.admin);
  const { data: pendingMembers } = useGetPendingMembersQuery(notification?._id);
  const [acceptInvitation] = useAcceptInvitationMutation();
  const [rejectInvitation] = useRejectInvitationMutation();
  const navigate = useNavigate();

  const findInvitation = pendingMembers?.invitations?.find(
    (invite: any) => invite?.user?._id === user._id
  );

  const acceptInvitationData = {
    invitationId: findInvitation?._id,
    userId: findInvitation?.user?._id,
  };

  const handleAcceptInvitation = async () => {
    const result: any = await acceptInvitation(acceptInvitationData);
    if (result?.data?.success) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: result?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      });
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
  const handleRejectInvitation = async () => {
    const result: any = await rejectInvitation(acceptInvitationData);
    if (result?.data?.success) {
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
    <Transition appear show={openModal} as={Fragment}>
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
              <Dialog.Panel className="w-[400px] mx-auto transform rounded-xl bg-orange-50 p-6 text-left  shadow-xl transition-all relative">
                {/* modal content */}
                <div>
                  <h3>
                    <span>You have receive a team invitation form </span>
                    <strong>{notification?.name}</strong>
                  </h3>
                  <div className="my-10">
                    <p>
                      join the <strong>{notification?.name}</strong> as a new
                      team member
                    </p>
                    {notification && (
                      <div className="my-5 flex items-center gap-5 ">
                        <div className="flex justify-center items-center w-12 h-12 bg-gray-400 rounded-full">
                          {notification?.image ? (
                            <img
                              className="w-full"
                              src={notification?.image}
                              alt=""
                            />
                          ) : (
                            <div className="flex justify-center items-center w-12 h-12 bg-gray-400 rounded-full">
                              <h4>{data?.data?.username?.slice(0, 1)}</h4>
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold">
                            {data?.data?.username}
                          </h4>
                          <p className="text-sm text-stone-400">
                            {data?.data?.email}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="mt-5 flex justify-between">
                    <button
                      onClick={handleRejectInvitation}
                      type="button"
                      className="border-2 outline-none border-black rounded-full px-10 py-2  text-sm flex items-center gap-2"
                    >
                      Reject
                    </button>
                    <button
                      onClick={handleAcceptInvitation}
                      type="button"
                      className="border outline-none rounded-full px-10 py-2 bg-blue-700 text-white text-md flex items-center gap-2"
                    >
                      Accept
                    </button>
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

export default SingleNotification;
