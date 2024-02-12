import { API_KEY } from "./api-key";
import { API_PREFIX } from "./api-prefix";

export const API_URL = (method: string, params?: string) => {
  return `${API_PREFIX}/${method}/?apikey=${API_KEY}&format=json&lang=ru_RU&${params}`;
};
