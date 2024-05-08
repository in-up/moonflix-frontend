import axios, { AxiosInstance } from "axios";
import { baseUrl } from "./constants";

const instance: AxiosInstance = axios.create({
  baseURL: baseUrl,
});

export default instance;
