export type IMessagePoster = {
  id: string;
  name: string;
  email: string;
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

export type ILastMessage = {
  text: string;
  files: string;
  images: string;
  createdAt: Date;
};

export type IChatFriend = {
  id: string;
  name: string;
  email: string;
  profile_picture: string;
  lastMessage: ILastMessage;
};
