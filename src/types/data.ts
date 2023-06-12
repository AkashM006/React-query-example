import { UseQueryResult } from "@tanstack/react-query";
import { ApiErrorResponse } from "./Response";

export interface Note {
  id: string;
  title: string;
  body: string;
  created_at: Date;
  updated_at: Date;
}

export interface NoteRequest {
  title: string;
  body: string;
}

export type CustomQueryHook<T> = UseQueryResult<T, ApiErrorResponse>;
