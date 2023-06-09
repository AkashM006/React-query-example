import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Note } from "../types/data";
import { ApiErrorResponse, ApiResponse } from "../types/Response";
import { getNotes } from "../api/notes";

interface Props {
  enabled?: boolean;
}

function useNotes(
  props?: Props | null
): UseQueryResult<ApiResponse<Note[]>, ApiErrorResponse> {
  return useQuery(["notes"], getNotes, {
    onSuccess: (data) => {
      console.log("Notes: ", data.msg);
    },
    onError: (error) => {
      console.log("Error: ", error.response?.data.msg);
    },
    select: (data) => data.data,
    enabled: props?.enabled,
  });
}

export default useNotes;
