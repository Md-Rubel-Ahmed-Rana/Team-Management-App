export type INotification = {
  id: number;
  type: string;
  createdAt: Date;
  read: boolean;
  content: {
    title: string;
    message: string;
    link: string;
    data: {
      invitedBy: string;
    };
  };
  recipient: {
    userId: string;
    name: string;
  };
};
