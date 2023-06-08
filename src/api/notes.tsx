import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "../types/Response";

axios.defaults.baseURL = "http://localhost:3000";

const getNotes = () => {
  return axios.get<ApiResponse>("/notes");
};

export { getNotes };
