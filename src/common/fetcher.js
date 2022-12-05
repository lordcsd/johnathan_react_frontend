import axios from "axios";
import { configConstants } from "./constants";

export const fetcher = (url) =>
  axios.get(configConstants.server.baseURL + url).then((res) => res.data);
