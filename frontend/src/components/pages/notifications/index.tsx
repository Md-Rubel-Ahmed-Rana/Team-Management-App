import React, { useState } from "react";
import moment from "moment";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  useDeleteManyNotificationMutation,
  useDeleteSingleNotificationMutation,
  useGetMyNotificationsQuery,
  useGetUnreadNotificationsCountQuery,
  useMarkAllNotificationsAsReadMutation,
  useReadNotificationMutation,
} from "@/features/notification";
import { IUser } from "@/interfaces/user.interface";
import { useLoggedInUserQuery } from "@/features/user";
import { formattedDate } from "@/utils/formattedDate";
import toast from "react-hot-toast";
import { IoCheckmarkCircle } from "react-icons/io5";
import { IoIosRadioButtonOff } from "react-icons/io";

const Button: any = dynamic(() => import("antd/lib/button"), {
  ssr: false,
});

const Modal: any = dynamic(() => import("antd/lib/modal"), {
  ssr: false,
});

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const NotificationModal = ({ open, setOpen }: Props) => {
  const { data: userData } = useLoggedInUserQuery({});
  const [limit, setLimit] = useState(10);
  const [isSelect, setIsSelect] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const user: IUser = userData?.data;
  const { data: unreadNotData, refetch: RefetchUnreadCount } =
    useGetUnreadNotificationsCountQuery(user?.id);
  const unreadCount = unreadNotData?.data || 0;

  const { data, isLoading, refetch, isFetching } = useGetMyNotificationsQuery({
    userId: user?.id,
    limit,
  });
  const [markAsRead] = useReadNotificationMutation();
  const [markAllAsRead, { isLoading: isMarkingAsRead }] =
    useMarkAllNotificationsAsReadMutation();
  const [deleteSingle] = useDeleteSingleNotificationMutation();
  const [deleteMany, { isLoading: isManyDeleting }] =
    useDeleteManyNotificationMutation();

  const notifications = data?.data?.payload;
  const total = data?.data?.total;

  const handleReloadNotifications = () => {
    refetch();
    RefetchUnreadCount();
  };

  const handleSeeMore = () => {
    if (limit < total) {
      setLimit((prevLimit) => prevLimit + 10);
      refetch();
    }
  };

  const handleMarkAsRead = async (id: string, name: string) => {
    const result: any = await markAsRead(id);
    if (result?.data?.statusCode === 200) {
      toast.success(`'${name}' marked as read`);
    } else {
      toast.error("Failed to mark as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    const result: any = await markAllAsRead(user?.id);
    if (result?.data?.statusCode === 200) {
      toast.success(
        `${result?.data?.readCount || 0} notifications marked as read`
      );
    } else {
      toast.error("Failed to mark as read");
    }
  };

  const handleDeleteSingle = async (id: string) => {
    const result: any = await deleteSingle(id);
    if (result?.data?.success) {
      toast.success("Notification delete successfully!");
    } else {
      toast.error("Failed delete notification!");
    }
  };

  const handleDeleteMany = async () => {
    const result: any = await deleteMany(selectedIds);
    if (result?.data?.success) {
      toast.success("Notification delete successfully!");
      setIsSelect(false);
      setSelectedIds([]);
    } else {
      toast.error("Failed delete notification!");
      setIsSelect(false);
      setSelectedIds([]);
    }
  };

  const handleSelectNotification = (id: string) => {
    if (selectedIds.includes(id)) {
      const remainingIds = selectedIds.filter((not) => not !== id);
      setSelectedIds(remainingIds);
    } else {
      setSelectedIds((prev: string[]) => [...prev, id]);
    }
  };

  return (
    <>
      <Modal
        title={
          <div className="flex items-center gap-2 lg:justify-between mt-2">
            <p className="text-sm lg:text-lg pt-3">Notifications</p>
            <Button
              onClick={() => {
                setSelectedIds([]);
                setIsSelect((prev) => !prev);
              }}
              type="default"
              size="small"
            >
              {isSelect ? "Unselect" : "Select"}
            </Button>
            <Button
              onClick={handleMarkAllAsRead}
              type="text"
              disabled={isMarkingAsRead || unreadCount === 0}
              className={`lg:mr-4  ${
                isMarkingAsRead
                  ? "bg-blue-600 text-white cursor-not-allowed"
                  : "text-blue-500"
              }`}
            >
              {isMarkingAsRead
                ? "Marking..."
                : unreadCount === 0
                ? "No unread"
                : "Mark all as read"}
            </Button>
          </div>
        }
        footer={
          <div className="flex justify-between">
            <Button
              type="default"
              className="bg-blue-600 text-white"
              onClick={handleSeeMore}
              disabled={limit >= total}
            >
              See more
            </Button>
            {selectedIds.length > 0 && (
              <Button
                disabled={isManyDeleting}
                onClick={handleDeleteMany}
                type="default"
                className="bg-red-600 text-white"
              >
                {isManyDeleting ? "Deleting..." : " Delete all"}
              </Button>
            )}
            <Button
              type="default"
              className="bg-blue-600 text-white"
              onClick={handleReloadNotifications}
            >
              Reload
            </Button>
          </div>
        }
        loading={isLoading || isFetching}
        open={open}
        onCancel={() => setOpen(false)}
        style={{ padding: "0px" }}
      >
        <div className="flex flex-col gap-2 lg:gap-4 overflow-y-auto h-[300px]">
          {notifications?.map((notification: any) => (
            <div
              key={notification?.id}
              className={`border-b flex flex-col gap-0 mr-2 p-2 rounded-md ${
                notification?.status === "unread" ? "bg-gray-200" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <h4 className="text-md font-semibold ">
                  {notification?.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {moment(notification?.createdAt).fromNow()}
                </p>
              </div>
              <p className="my-0">Type: {notification?.type}</p>
              <p className="my-0">{notification?.content}</p>
              <p className="my-0">Sent by: {notification?.sender?.name}</p>
              <button
                onClick={() => setOpen(false)}
                className="text-sm text-left"
              >
                <Link href={notification?.link} className="text-blue-600">
                  View link
                </Link>
              </button>
              <p className="flex flex-col lg:flex-row justify-between lg:items-center">
                <span>{formattedDate(notification?.createdAt)}</span>
                {isSelect ? (
                  <div className="flex justify-end">
                    {selectedIds.includes(notification?.id) ? (
                      <IoCheckmarkCircle
                        className="text-green-600 text-xl"
                        onClick={() =>
                          handleSelectNotification(notification?.id)
                        }
                      />
                    ) : (
                      <IoIosRadioButtonOff
                        className="text-lg"
                        onClick={() =>
                          handleSelectNotification(notification?.id)
                        }
                      />
                    )}
                  </div>
                ) : (
                  <div className="flex gap-1 justify-end items-center mt-2 lg:mt-0">
                    {notification?.status === "unread" && (
                      <button
                        onClick={() =>
                          handleMarkAsRead(
                            notification?.id,
                            notification?.title
                          )
                        }
                        className="bg-sky-400 hover:bg-sky-600 text-white px-2  rounded-md"
                      >
                        Mark as read
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteSingle(notification?.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2  rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </p>
            </div>
          ))}
          {notifications?.length === 0 && (
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-gray-500">No notifications</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default NotificationModal;
