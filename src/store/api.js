import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:3000/api",
  baseURL: "https://conduit.productionready.io/api"
});

export function setToken(jwt) {
  api.defaults.headers.common["Authorization"] = `Token ${jwt}`;
}

export function clearToken() {
  delete api.defaults.headers.common["Authorization"];
}
