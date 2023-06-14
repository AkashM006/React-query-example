import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { getNotes } from "../api/notes";
import { Note } from "../types/data";
import { ApiErrorResponse } from "../types/Response";

export type List = {
  count: number;
  data: Note[];
};

function useNotesInfinite(): UseInfiniteQueryResult<List, ApiErrorResponse> {
  return useInfiniteQuery(
    ["notes-infinite"],
    ({ pageParam = 1 }) => getNotes(pageParam),
    {
      getNextPageParam: (_lastPage, pages) => {
        if (pages[0].count >= pages.length * 5) {
          return pages.length + 1;
        }
        return undefined;
      },
    }
  );
}

export default useNotesInfinite;
