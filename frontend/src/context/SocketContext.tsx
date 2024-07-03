import useGetLoggedInUser from "@/hooks/useGetLoggedInUser";
import { IContext } from "@/interfaces/context.interface";
import { IMessage } from "@/interfaces/message.interface";
import { IUser } from "@/interfaces/user.interface";
import { ReactNode, createContext, useEffect, useState } from "react";

const initValues: IContext = {
  realTimeMessages: [],
  setRealTimeMessages: (messages: IMessage[]) => {},
  refetchTask: false,
  setRefetchTask: () => false,
};

export const SocketContext = createContext<IContext>(initValues);

type Props = {
  children: ReactNode;
};

const SocketProvider = ({ children }: Props) => {
  const socket: any = {};
  const [realTimeMessages, setRealTimeMessages] = useState<IMessage[]>([]);
  const [refetchTask, setRefetchTask] = useState<any>(false);
  const user: IUser = useGetLoggedInUser();
  const [activeUsers, setActiveUsers] = useState([]);

  // connect to socket notification room
  // useEffect(() => {
  //   socket.emit("notification-room", user?.id);
  // }, [socket, user?.id]);

  // // connect to socket active
  // useEffect(() => {
  //   socket.emit("active", user?.id);
  // }, [socket, user?.id]);

  // // connect to socket active
  // useEffect(() => {
  //   socket.on("activeUsers", (data: any) => {
  //     setActiveUsers(data);
  //     console.log("Active users", data);
  //   });
  // }, [socket]);

  const values: IContext = {
    realTimeMessages,
    setRealTimeMessages,
    refetchTask,
    setRefetchTask,
  };

  return (
    <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
