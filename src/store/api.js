import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    Authorization:
      "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNDc2ZDMwNDYxYjNiNTgzMTllYWM3YSIsInVzZXJuYW1lIjoic2FiaXJqbWkiLCJleHAiOjE2MDM3MDQ2NTgsImlhdCI6MTU5ODUyMDY1OH0.4x_Meu0Sv2yyWIFzkHNYZEnLw6zCpoxHmfy5EjKsxTY"
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
