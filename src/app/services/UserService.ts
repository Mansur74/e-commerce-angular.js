import axios from "axios";
import { User } from "../interfaces/User";
import { DataResult } from "../interfaces/DataResult";
import { getAccessToken, getRefreshToken } from "./AuthService";

export const getUserById = async (id : number) => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = axios.get(`http://localhost:8080/api/user/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const getUser = async () => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.get<DataResult<User>>(`http://localhost:8080/api/user/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}