import { UseQueryResult } from "@tanstack/react-query";
import { ApiErrorResponse, ApiResponse } from "./Response";

export interface Note {
  id: string;
  title: string;
  body: string;
  created_at: Date;
  updated_at: Date;
}

export type CustomQueryHook<T> = UseQueryResult<
  ApiResponse<T>,
  ApiErrorResponse
>;
