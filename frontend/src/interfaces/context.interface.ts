import { IMessage } from "./message.interface";

export type IContext = {
  realTimeMessages: IMessage[];
  setRealTimeMessages: (messages: IMessage[]) => void;
  refetchTask: false;
  setRefetchTask: (status: boolean) => void;
  socket: any;
};
