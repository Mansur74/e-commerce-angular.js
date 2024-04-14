import axios from "axios";
import { Result } from "../interfaces/Result";
import { DataResult } from "../interfaces/DataResult";
import { ShopRate } from '../interfaces/ShopRate';

export const createShopRate = (shopRate: ShopRate, userId: number, shopId: number ) => {
  const result = axios.post<Result>(`http://localhost:8080/api/shopRate?userId=${userId}&shopId=${shopId}`, shopRate);
  return result;
}

export const updateShopRate = (shopRate: ShopRate, userId: number, shopId: number ) => {
  const result = axios.put<Result>(`http://localhost:8080/api/shopRate?userId=${userId}&shopId=${shopId}`, shopRate);
  return result;
}


export const getShopRateById = (userId: number, shopId: number ) => {
  const result = axios.get<DataResult<ShopRate>>(`http://localhost:8080/api/shopRate?userId=${userId}&shopId=${shopId}`);
  return result;
}

export const getAllShopRates = () => {
  const result = axios.post<DataResult<ShopRate[]>>(`http://localhost:8080/api/ShopRates`);
  return result;
}