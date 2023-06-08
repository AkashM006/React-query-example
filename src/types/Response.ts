import { AxiosError, AxiosResponse } from "axios";

type Status = "SUCCESS" | "FAILED";

interface ErrorResponse {
  msg: string;
  status: Status;
}

interface SuccessResponse<T> {
  msg: T;
  status: Status;
}

export type ApiSuccessResponse<T> = AxiosResponse<SuccessResponse<T>>;

export type ApiErrorResponse = AxiosError<ErrorResponse>;
