import {
  UseMutationResult,
  useMutation,
  useQueryClient,
  QueryCache,
  UseInfiniteQueryResult,
  InfiniteData,
} from "@tanstack/react-query";
import { createNote } from "../api/notes";
import {
  ApiErrorResponse,
  ApiValidationErrorResponse,
} from "../types/Response";
import { Note, NoteRequest } from "../types/data";
import { List } from "./useNotesInfinite";

type Props = {
  onSuccess?: (data: Note) => void;
  onError?: () => void;
};

function useAddNote(
  props?: Props | null
): UseMutationResult<
  Note,
  ApiErrorResponse | ApiValidationErrorResponse,
  NoteRequest
> {
  const queryClient = useQueryClient();

  return useMutation<
    Note,
    ApiErrorResponse | ApiValidationErrorResponse,
    NoteRequest
  >(createNote, {
    onSuccess: (data) => {
      if (props?.onSuccess) props?.onSuccess(data);

      queryClient.setQueryData(["notes-infinite"], (oldQuery: any) => {
        let prevData = oldQuery as InfiniteData<List>;
        let pages = prevData.pages;
        let initialCount = 1;
        let replaced = false;

        let result = pages.map((page) => {
          if (page.data.length === 5) {
            initialCount = page.count + 1;
            return {
              count: initialCount,
              data: [...page.data],
            };
          }
          replaced = true;
          initialCount = page.count + 1;
          return {
            count: initialCount,
            data: [...page.data, data],
          };
        });

        return {
          ...prevData,
          pages: [...result],
        };
      });
    },
    onError: props?.onError,
  });
}

export default useAddNote;
