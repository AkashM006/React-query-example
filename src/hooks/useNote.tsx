import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getNote } from "../api/notes";
import { CustomQueryHook, Note } from "../types/data";

const useNote = (noteId: string): CustomQueryHook<Note> => {
  const queryClient = useQueryClient();
  return useQuery(["notes", noteId], () => getNote(noteId), {
    initialData: () => {
      const notes: Note[] | undefined = queryClient.getQueryData(["notes"]);
      const note = notes?.filter((note) => note.id === noteId);

      if (!note) return undefined;

      return note;
    },
  });
};

export default useNote;
