import axios from "axios";

export const api = axios.create({
  baseURL: "https://conduit.productionready.io/api",
  headers: {
    Authorization:
      "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6OTk5NTYsInVzZXJuYW1lIjoic2FiaXItam1pIiwiZXhwIjoxNjAzNjA4ODA4fQ.zvdC311BhqZcmRIoQ1u08_tbPQXRLw6k1gzbiGL7mYY"
  }
});

export function setToken(jwt) {
  console.log(jwt);
  return;
  // api.defaults.headers.common["Authorization"] = `Token ${jwt}`;
}

export default function clearToken() {
  return;
  // delete api.defaults.headers.common["Authorization"];
}
