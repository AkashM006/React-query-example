import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { getNotes } from "../api/notes";
import { Note } from "../types/data";

type List = {
  count: number;
  data: Note[];
};

function useNotesInfinite(): UseInfiniteQueryResult<List> {
  return useInfiniteQuery(
    ["notes"],
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
