import axios from "axios";
import { baseURL } from "./constants";

export const fetcher = (url) => axios.get(baseURL + url).then((res) => res.data);