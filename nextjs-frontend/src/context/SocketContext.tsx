import { IContext } from "@/interfaces/context.interface";
import { IMessage } from "@/interfaces/message.interface";
import { ReactNode, createContext, useState } from "react";
import io, { Socket } from "socket.io-client";

const initValues: IContext = {
  socket: io("http://localhost:5000") as Socket,
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
  const socketIo: any = io;
  const socket = socketIo.connect("http://localhost:5000");
  const [realTimeMessages, setRealTimeMessages] = useState<IMessage[]>([]);
  const [refetchTask, setRefetchTask] = useState<any>(false);

  const values: IContext = {
    socket,
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
