import axios from "axios";

const instance = axios.create({
  baseURL: `/api` as string,
});

export default instance;
