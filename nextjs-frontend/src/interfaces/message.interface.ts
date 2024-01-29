interface Poster {
  _id?: string;
  name: string;
  profile_picture: string;
}

export interface IMessage {
  poster: Poster;
  _id?: string;
  text: string;
  images: string[];
  files: string[];
  links: string[];
}
