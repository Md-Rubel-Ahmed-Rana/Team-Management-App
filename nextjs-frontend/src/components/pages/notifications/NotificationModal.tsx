/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, SetStateAction, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import {
  useGetNotificationQuery,
  useUpdateNotificationMutation,
} from "@/features/notification";
import { RxCross2 } from "react-icons/rx";
import { INotification } from "@/interfaces/notification.interface";

const NotificationModal = ({ isOpen, setIsOpen }: SetStateAction<any>) => {
  const { data }: any = useLoggedInUserQuery({});
  const user: IUser = data?.data;
  const { data: notifiedData } = useGetNotificationQuery(user?._id);
  const [updatedNotifications] = useUpdateNotificationMutation();
  const notifications: INotification[] = notifiedData?.data;
  const unreadNotification = notifications?.filter(
    (notification: INotification) => !notification?.read
  );

  const ids = unreadNotification.map((not: INotification) => not.id);

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const update = async () => {
      const result = await updatedNotifications({ userId: user._id, ids });
      console.log(result);
    };
    update();
    console.log("Need to update notification as read", ids);
  }, []);

  return (
    <Transition appear show={isOpen} as={Fragment}>
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
            <div className="lg:w-[400px] mx-auto bg-white rounded-xl p-6 text-left shadow-xl transition-all relative">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Notifications</h1>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <RxCross2 />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {notifications?.map((notification: INotification) => (
                  <div
                    key={notification.id}
                    className="shadow-lg border p-4 rounded-md"
                  >
                    <h4 className="text-lg font-semibold mb-2">
                      {notification.content.title}
                    </h4>
                    <p>{notification.content.message}</p>
                    <p>Invited by: {notification.content.data.invitedBy}</p>
                    <p className="text-sm">
                      <a
                        href={notification.content.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600"
                      >
                        View link
                      </a>
                    </p>
                  </div>
                ))}
              </div>

              {notifications?.length === 0 && (
                <p className="text-gray-500">No notifications</p>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NotificationModal;
