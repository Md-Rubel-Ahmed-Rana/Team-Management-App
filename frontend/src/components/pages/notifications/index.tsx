import React, { useState } from "react";
import moment from "moment";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  useGetMyNotificationsQuery,
  useGetUnreadNotificationsCountQuery,
  useMarkAllNotificationsAsReadMutation,
  useReadNotificationMutation,
} from "@/features/notification";
import { IUser } from "@/interfaces/user.interface";
import { useLoggedInUserQuery } from "@/features/user";
import { formattedDate } from "@/utils/formattedDate";
import toast from "react-hot-toast";

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
    console.log(result);
  };

  return (
    <>
      <Modal
        title={
          <div className="flex items-center justify-between">
            <p>Notifications</p>
            <Button
              onClick={handleMarkAllAsRead}
              type="text"
              disabled={isMarkingAsRead || unreadCount === 0}
              className={`mr-4  ${
                isMarkingAsRead
                  ? "bg-blue-600 text-white cursor-not-allowed"
                  : "text-blue-500"
              }`}
            >
              {isMarkingAsRead
                ? " Marking..."
                : unreadCount === 0
                ? "No unread"
                : "Mark as read"}
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
      >
        <div className="flex flex-col gap-2 lg:gap-4 overflow-y-auto h-[300px]">
          {notifications?.map((notification: any) => (
            <div
              onClick={() =>
                handleMarkAsRead(notification?.id, notification?.title)
              }
              key={notification?.id}
              className={`border-b flex flex-col gap-0 mr-2 p-2 rounded-md cursor-pointer ${
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
              <p>{formattedDate(notification?.createdAt)}</p>
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
