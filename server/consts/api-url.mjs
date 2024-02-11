import { API_KEY } from "./api-key.mjs";
import { API_PREFIX } from "./api-prefix.mjs";

export const API_URL = (method, params) => {
  return `${API_PREFIX}/${method}/?apikey=${API_KEY}&format=json&lang=ru_RU&${params}`;
};
