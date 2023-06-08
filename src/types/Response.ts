import { AxiosError, AxiosResponse } from "axios";

type Status = "SUCCESS" | "FAILED";

export interface ApiResponse<T = any> {
  msg: T;
  status: Status;
}

export type ApiSuccessResponse<T> = AxiosResponse<ApiResponse<T>>;

export type ApiErrorResponse = AxiosError<ApiResponse<String>>;
