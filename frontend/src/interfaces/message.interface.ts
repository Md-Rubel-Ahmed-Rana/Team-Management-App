export type IMessagePoster = {
  id: string;
  name: string;
  profile_picture: string;
};

export interface IMessage {
  poster: IMessagePoster;
  id: string;
  text: string;
  images: string[];
  files: string[];
  createdAt: Date;
}

export type IMessagePayloadForSocket = {
  id: string;
  poster: IMessagePoster;
  conversationId: string;
  text: string;
  type: string;
  images: string[];
  files: string[];
  createdAt: Date;
};
