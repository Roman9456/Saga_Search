import axios from "axios";

export const getPostApi = (text: string) => {
  return axios
    .get(import.meta.env.VITE_HOST, {
      params: { q: text },
    })
    .then((response) => response.data);
};
