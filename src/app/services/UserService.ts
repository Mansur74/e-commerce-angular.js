import axios from "axios";

export const getUserById = (id : number) => {
  const result = axios.get(`http://localhost:8080/api/user/${id}`);
  return result;
}