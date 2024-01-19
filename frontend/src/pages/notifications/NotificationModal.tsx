import { Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BsCheckCircle, BsFillChatLeftTextFill } from "react-icons/bs";
import SingleNotification from "./SingleNotification";
import { useAppSelector } from "../../redux/hooks";

const NotificationModal = ({ isOpen, setIsOpen }: SetStateAction<any>) => {
  const closeModal = () => {
    setIsOpen(false);
  };
  const [openModal, setOpanModal] = useState(false);
  const [notification, setNotification] = useState("");
  const user: any = useAppSelector((state) => state.user.user);

  const handleOpenModal = (not: any) => {
    setOpanModal(true);
    setNotification(not);
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

        <div className="fixed inset-0 flex flex-col items-end justify-normal">
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
              <Dialog.Panel className="w-[400px] mr-14 transform rounded-xl bg-orange-50 text-left  shadow-xl transition-all relative">
                {/* modal content */}
                <div className="menu  bg-white dropdown-content  shadow-2xl rounded-md mt-10  -mr-14">
                  <div className="p-4 text-sm w-full ">
                    <div className="rounded-xl">
                      <div className="w-full lg:flex border-b-2 justify-between items-center pb-2">
                        <div className="flex items-center gap-2 rounded-md">
                          <h3 className="font-bold">Notifications</h3>
                          <select
                            defaultValue="All"
                            className="border-0 text-sm py-0"
                            name="filter"
                            id="filter"
                          >
                            <option value="All">All</option>
                            <option value="Unread">Unread</option>
                            <option value="Seen">Seen</option>
                          </select>
                        </div>
                        <div>
                          <button
                            className="flex items-center mt-3 lg:mt-0 md:mt-0 gap-2"
                            type="button"
                          >
                            <span>Mark all as read </span>
                            <BsCheckCircle />
                          </button>
                        </div>
                      </div>
                      <div className="w-full overflow-hidden hover:overflow-auto h-[450px] scrollbar scrollbar-w-[4px] scrollbar-thumb-blue-600 scrollbar-thumb-rounded-md scrollbar-track-slate-100 pr-1">
                        {user?.notifications?.length ? (
                          <>
                            {user?.notifications.map((notifi: any) => (
                              <div key={notifi?._id || Math.random()}>
                                <button
                                  key={notifi?._id || Math.random()}
                                  type="button"
                                  onClick={() => handleOpenModal(notifi)}
                                  className="flex w-full text-start my-2 rounded-md items-center gap-4 p-2 border-b-2 bg-gray-300"
                                >
                                  <p>
                                    <BsFillChatLeftTextFill />
                                  </p>
                                  <p>
                                    <span className="mr-2">
                                      You have a new notification from
                                    </span>
                                    <span className="font-bold mr-2">
                                      {notifi?.name}
                                    </span>
                                    team for
                                    <span className="font-bold ml-2">
                                      {notifi?.category}
                                    </span>
                                  </p>
                                </button>
                              </div>
                            ))}
                          </>
                        ) : (
                          <p className="grid place-items-center h-full">
                            No notifications
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {openModal && (
                    <SingleNotification
                      openModal={openModal}
                      setOpanModal={setOpanModal}
                      notification={notification}
                    />
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

export default NotificationModal;
