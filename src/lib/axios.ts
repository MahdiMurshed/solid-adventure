import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const instance = axios.create({
  baseURL: `${baseUrl}api` as string,
});

export default instance;
