import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { createNote } from "../api/notes";
import {
  ApiErrorResponse,
  ApiValidationErrorResponse,
} from "../types/Response";
import { Note, NoteRequest } from "../types/data";

type Props = {
  onSuccess?: () => void;
  onError?: () => void;
};

function useAddNote(
  props?: Props | null
): UseMutationResult<
  Note,
  ApiErrorResponse | ApiValidationErrorResponse,
  NoteRequest
> {
  return useMutation(createNote, {
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  });
}

export default useAddNote;
