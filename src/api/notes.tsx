import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:3000";

const getNotes = (): Promise<AxiosResponse> => {
  return axios.get("/notes");
};

export { getNotes };
