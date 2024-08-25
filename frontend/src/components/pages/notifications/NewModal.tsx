import React from "react";
import { Button, Modal } from "antd";
import { demoNotificationData } from "@/constants/demoNotificationsData";
import { INotification } from "@/interfaces/notification.interface";
import moment from "moment";
import Link from "next/link";
import { formattedDate } from "@/utils/formattedDate";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const NewModal = ({ open, setOpen }: Props) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const refetchNots = () => {
    setOpen(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <Modal
        title={<p>Notifications (Demos) </p>}
        footer={
          <Button
            type="default"
            className="bg-blue-600 text-white"
            onClick={refetchNots}
          >
            Reload
          </Button>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
        centered={true}
        bodyStyle={{ padding: 0 }} // Remove extra padding
        className="max-w-[90vw] lg:max-w-[60vw] mx-auto"
      >
        <div className="flex flex-col gap-2 lg:gap-4 overflow-y-auto max-h-[70vh] lg:max-h-[60vh] p-4">
          {demoNotificationData?.map((notification: INotification) => (
            <div
              key={notification.id.toString() + Math.random()}
              className="border-b flex flex-col gap-0"
            >
              <div className="flex justify-between items-center">
                <h4 className="text-md font-semibold">
                  {notification.content.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {moment(notification.createdAt).fromNow()}
                </p>
              </div>

              <p className="my-0">{notification.content.message}</p>
              <p className="my-0">
                Send by: {notification.content.data.sendBy}
              </p>
              <button
                onClick={() => setOpen(false)}
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
          ))}
          {demoNotificationData?.length === 0 && (
            <p className="text-gray-500">No notifications</p>
          )}
        </div>
      </Modal>
    </>
  );
};

export default NewModal;
