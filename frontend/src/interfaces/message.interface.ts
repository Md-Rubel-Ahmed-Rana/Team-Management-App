interface Poster {
  id?: string;
  name: string;
  profile_picture: string;
}

export interface IMessage {
  poster: Poster;
  id?: string;
  text: string;
  images: string[];
  files: string[];
  links: string[];
  createdAt: Date;
}
