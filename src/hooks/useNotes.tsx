import { useQuery } from "@tanstack/react-query";
import { CustomQueryHook, Note } from "../types/data";
import { getNotes } from "../api/notes";

interface Props {
  page: number;
  enabled?: boolean;
}

function useNotes(props: Props): CustomQueryHook<Note[]> {
  return useQuery(["notes", props.page], () => getNotes(props.page), {
    onError: (error) => {},
    enabled: props?.enabled,
    keepPreviousData: true,
  });
}

export default useNotes;
