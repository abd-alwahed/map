import baseAxios from "axios";
import { API } from "./constant";

export const axios = baseAxios.create({
  baseURL: API,
});
