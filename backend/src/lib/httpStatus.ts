import httpStatus from "http-status";

interface HttpStatusInterface {
  [key: string]: number | string;
}

class HttpStatus implements HttpStatusInterface {
  [key: string]: number | string;

  constructor() {
    Object.keys(httpStatus).forEach((key) => {
      this[key] = (httpStatus as unknown as HttpStatusInterface)[key];
    });
  }
}

export const HttpStatusInstance = new HttpStatus();
