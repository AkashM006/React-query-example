import {
  UseMutationResult,
  useMutation,
  useQueryClient,
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
    // onSuccess: (data) => {
    //   if (props?.onSuccess) props?.onSuccess(data);

    //   queryClient.setQueryData(["notes-infinite"], (oldQuery: any) => {
    //   let prevData = oldQuery as InfiniteData<List>;
    //   let pages = prevData.pages;
    //   let initialCount = 1;

    //   let result = pages.map((page) => {
    //     if (page.data.length === 5) {
    //       initialCount = page.count + 1;
    //       return {
    //         count: initialCount,
    //         data: [...page.data],
    //       };
    //     }
    //     initialCount = page.count + 1;
    //     return {
    //       count: initialCount,
    //       data: [...page.data, data],
    //     };
    //   });

    //   return {
    //     ...prevData,
    //     pages: [...result],
    //   };
    // });
    // },
    onMutate: async (data) => {
      await queryClient.cancelQueries();
      const previousData = queryClient.getQueryData(["notes-infinite"]);
      const newData = {
        ...data,
        id: Math.random().toString(),
        created_at: Date.now(),
        updated_at: Date.now(),
      };
      queryClient.setQueryData(["notes-infinite"], (oldQuery: any) => {
        let prevData = oldQuery as InfiniteData<List>;
        let pages = prevData.pages;
        let initialCount = 1;

        let result = pages.map((page) => {
          if (page.data.length === 5) {
            initialCount = page.count + 1;
            return {
              count: initialCount,
              data: [...page.data],
            };
          }
          initialCount = page.count + 1;
          return {
            count: initialCount,
            data: [...page.data, newData],
          };
        });

        return {
          ...prevData,
          pages: [...result],
        };
      });
      return {
        previousData,
      };
    },
    // onError: props?.onError,
    onError: (_error, _data, context: any) => {
      queryClient.setQueryData(["notes-infinite"], context.previousData);
      console.log("On error in useInfiniteQuery hook of add note");
      if (props?.onError) props.onError();
    },
    onSettled: () => {
      queryClient.invalidateQueries(["notes-infinite"]);
    },
  });
}

export default useAddNote;
