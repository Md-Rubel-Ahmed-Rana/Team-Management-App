import { baseApi } from "@/features/api";
import { IContext } from "@/interfaces/context.interface";
import { IMessage } from "@/interfaces/message.interface";
import { ReactNode, createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const initValues: IContext = {
  realTimeMessages: [],
  setRealTimeMessages: (messages: IMessage[]) => {},
  refetchTask: false,
  setRefetchTask: () => false,
  socket: "",
};

export const SocketContext = createContext<IContext>(initValues);

type Props = {
  children: ReactNode;
};

const SocketProvider = ({ children }: Props) => {
  const socket: any = io(baseApi);
  const [realTimeMessages, setRealTimeMessages] = useState<IMessage[]>([]);
  const [user, setUser] = useState<any>({});
  const [refetchTask, setRefetchTask] = useState<any>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${baseApi}/auth`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setUser(data?.data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user?.id) {
      socket.emit("notification-room", user.id);
    }
  }, [user]);

  const values: IContext = {
    realTimeMessages,
    setRealTimeMessages,
    refetchTask,
    setRefetchTask,
    socket,
  };

  return (
    <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
