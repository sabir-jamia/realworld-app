import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api"
});

export function setToken(jwt) {
  delete api.defaults.headers.common["Authorization"];
  api.defaults.headers.common["Authorization"] = `Token ${jwt}`;
}
