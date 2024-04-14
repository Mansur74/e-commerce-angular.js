import axios from "axios"
import { DataResult } from "../interfaces/DataResult";
import { Category } from "../interfaces/Category";
import { getAccessToken, getRefreshToken } from "./AuthService";

export const getAllCategories = async () => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = axios.get<DataResult<Category[]>>(`http://localhost:8080/api/category`, {
    headers: { 
      Authorization: `Bearer ${accessToken}` 
    }
  });
  return result;
}