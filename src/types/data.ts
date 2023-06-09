import { UseQueryResult } from "@tanstack/react-query";
import { ApiErrorResponse } from "./Response";

export interface Note {
  id: string;
  title: string;
  body: string;
  created_at: Date;
  updated_at: Date;
}

export type CustomQueryHook<T> = UseQueryResult<T, ApiErrorResponse>;
