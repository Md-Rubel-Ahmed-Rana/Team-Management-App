/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import { useUpdateNotificationMutation } from "@/features/notification";
import { RxCross2 } from "react-icons/rx";
import { INotification } from "@/interfaces/notification.interface";
import Link from "next/link";
import moment from "moment";
import { formattedDate } from "@/utils/formattedDate";

const NotificationModal = ({
  isOpen,
  setIsOpen,
  notifications,
  unreadNotifications,
}: any) => {
  const { data }: any = useLoggedInUserQuery({});
  const user: IUser = data?.data;
  const [updatedNotifications] = useUpdateNotificationMutation();

  const ids = unreadNotifications.map((not: INotification) => not.id);

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (ids?.length > 0) {
      const update = async () => {
        await updatedNotifications({ userId: user.id, ids });
      };
      update();
    }
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
            <div className="w-[95%] lg:w-[400px] mx-auto bg-white dark:bg-gray-400 dark:text-black rounded-xl p-2 lg:p-6 text-left shadow-xl transition-all relative">
              <div className="flex justify-between items-center mb-2 lg:mb-4">
                <h1 className="text-xl font-bold">Notifications</h1>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <RxCross2 />
                </button>
              </div>

              <div className="flex flex-col gap-2 lg:gap-4 w-full overflow-hidden hover:overflow-auto h-[450px] scrollbar scrollbar-w-[4px] scrollbar-thumb-blue-600 scrollbar-thumb-rounded-md scrollbar-track-slate-100 pr-1">
                {notifications?.map((notification: INotification) => (
                  <>
                    <div
                      key={notification.id.toString() + Math.random()}
                      className="flex flex-col gap-2 lg:shadow-lg lg:border p-2 lg:p-4 rounded-md"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="text-md font-semibold">
                          {notification.content.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {moment(notification.createdAt).fromNow()}
                        </p>
                      </div>

                      <p>{notification.content.message}</p>
                      <p>Send by: {notification.content.data.sendBy}</p>
                      <button
                        onClick={closeModal}
                        className="text-sm text-left"
                      >
                        <Link
                          href={notification.content.link}
                          className="text-blue-600"
                        >
                          View link
                        </Link>
                      </button>
                      <p>{formattedDate(notification.createdAt)}</p>
                    </div>
                    <hr className="block lg:hidden" />
                  </>
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
