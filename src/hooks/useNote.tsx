import { useQuery } from "@tanstack/react-query";
import { getNote } from "../api/notes";
import { CustomQueryHook, Note } from "../types/data";

const useNote = (noteId: string): CustomQueryHook<Note> => {
  return useQuery(["notes", noteId], () => getNote(noteId), {
    select: (data) => data.data,
  });
};

export default useNote;
