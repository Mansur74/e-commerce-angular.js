import axios from "axios";
import { DataResult } from "../interfaces/DataResult";
import { Product } from "../interfaces/Product";
import { getAccessToken, getRefreshToken } from "./AuthService";

export const getAllProducts = async () => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.get<DataResult<Product[]>>(`http://localhost:8080/api/product`, {
    headers: { 
      Authorization: `Bearer ${accessToken}` 
    }
  });
  return result;
}

export const getProductById = async (id: number) => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.get<DataResult<Product>>(`http://localhost:8080/api/product/${id}`, {
    headers: { 
      Authorization: `Bearer ${accessToken}` 
    }
  });
  return result;
}
