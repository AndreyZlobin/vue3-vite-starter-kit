import { AxiosError, AxiosResponse } from "axios";
import { Merge } from "~/types";

export type defaultErrorType = {
  message: string;
};

export interface headersInterface {
  Accept: string;
  "Content-Type": string;
  Authorization?: string;
}

export type SuccessType<T> = {
  success: boolean;
  message?: string;
  data: T;
};

export type SuccessResponse = Merge<AxiosResponse | any, SuccessType<any>>;

export interface ErrorResponse {
  response: AxiosError | Array<defaultErrorType>;
  error: boolean;
  status: number | boolean;
}

export type ResponseType = SuccessResponse | ErrorResponse;
