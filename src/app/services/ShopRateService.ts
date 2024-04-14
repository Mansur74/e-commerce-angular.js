import axios from "axios";
import { Result } from "../interfaces/Result";
import { DataResult } from "../interfaces/DataResult";
import { ShopRate } from '../interfaces/ShopRate';
import { getAccessToken, getRefreshToken } from "./AuthService";

export const createShopRate = async (shopRate: ShopRate, userId: number, shopId: number ) => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = axios.post<Result>(`http://localhost:8080/api/shopRate?userId=${userId}&shopId=${shopId}`, shopRate, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const updateShopRate = async (shopRate: ShopRate, userId: number, shopId: number ) => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = axios.put<Result>(`http://localhost:8080/api/shopRate?userId=${userId}&shopId=${shopId}`, shopRate, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}


export const getShopRateById = async (userId: number, shopId: number ) => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = axios.get<DataResult<ShopRate>>(`http://localhost:8080/api/shopRate?userId=${userId}&shopId=${shopId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const getAllShopRates = async () => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = axios.post<DataResult<ShopRate[]>>(`http://localhost:8080/api/ShopRates`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}