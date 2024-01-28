import { ReactNode, createContext } from "react";
import io from "socket.io-client";
export const SocketContext = createContext("");

type propsType = {
  children: ReactNode;
};

const SocketProvider = ({ children }: propsType) => {
  const socketIo: any = io;
  const socket = socketIo.connect("http://localhost:5000");

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
