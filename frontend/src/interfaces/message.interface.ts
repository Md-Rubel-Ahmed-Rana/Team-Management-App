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
  links: string[];
  createdAt: Date;
}
