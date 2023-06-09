import { useQuery } from "@tanstack/react-query";
import { CustomQueryHook, Note } from "../types/data";
import { getNotes } from "../api/notes";

interface Props {
  enabled?: boolean;
}

function useNotes(props?: Props | null): CustomQueryHook<Note[]> {
  return useQuery(["notes"], getNotes, {
    onError: (error) => {
      console.log("Error: ", error.response?.data.msg);
    },
    enabled: props?.enabled,
  });
}

export default useNotes;
