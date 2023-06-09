import axios from "axios";
import { ApiResponse } from "../types/Response";

axios.defaults.baseURL = "http://localhost:3000";

const getNotes = () => {
  return axios.get<ApiResponse>("/notes").then((res) => res.data.msg);
};

const getNote = (noteId: string) => {
  return axios.get<ApiResponse>(`/notes/${noteId}`).then((res) => res.data.msg);
};

export { getNotes, getNote };
