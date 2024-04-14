import axios from "axios";
import { DataResult } from "../interfaces/DataResult";
import { Shop } from "../interfaces/Shop";
import { Result } from "../interfaces/Result";
import { getAccessToken, getRefreshToken } from "./AuthService";
import { PageResult } from "../interfaces/PageResult";

export const getAllShops = async (pageNumber: number, pageSize: number) => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.get<DataResult<PageResult<Shop>>>(`http://localhost:8080/api/shops?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
    headers: { 
      Authorization: `Bearer ${accessToken}` 
    }
  });
  return result;
}

export const getShopById = async (shopId: number) => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.get<DataResult<Shop>>(`http://localhost:8080/api/shop/${shopId}`, {
    headers: { 
      Authorization: `Bearer ${accessToken}` 
    }
  });
  return result;
}

export const updateShop = async (shop: Shop, shopId: number) => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.put<Result>(`http://localhost:8080/api/shop/${shopId}`, shop, {
    headers: { 
      Authorization: `Bearer ${accessToken}` 
    }
  });
  return result;
}