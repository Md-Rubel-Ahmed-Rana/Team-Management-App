export type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data?: T | null;
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
