import { useMutation } from "@tanstack/react-query";
import { createNote } from "../api/notes";

type Props = {
  onSuccess?: () => void;
  onError?: () => void;
};

function useAddNote(props?: Props | null) {
  return useMutation(createNote, {
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  });
}

export default useAddNote;
