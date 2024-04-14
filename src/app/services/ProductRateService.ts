import axios from "axios";
import { ProductRate } from "../interfaces/ProductRate";
import { DataResult } from "../interfaces/DataResult";
import { Result } from "../interfaces/Result";
import { getAccessToken, getRefreshToken } from "./AuthService";

export const createProductRate = async (productRate: ProductRate, userId: number, productId: number ) => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = axios.post<Result>(`http://localhost:8080/api/productRate?userId=${userId}&productId=${productId}`, productRate, {
    headers: { 
      Authorization: `Bearer ${accessToken}` 
    }
  });
  return result;
}

export const updateProductRate = async (productRate: ProductRate, userId: number, productId: number ) => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = axios.put<Result>(`http://localhost:8080/api/productRate?userId=${userId}&productId=${productId}`, productRate, {
    headers: { 
      Authorization: `Bearer ${accessToken}` 
    }
  });
  return result;
}


export const getProductRateById = async (userId: number, productId: number ) => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = axios.get<DataResult<ProductRate>>(`http://localhost:8080/api/productRate?userId=${userId}&productId=${productId}`, {
    headers: { 
      Authorization: `Bearer ${accessToken}` 
    }
  });
  return result;
}

export const getAllProductRates = async () => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = axios.post<DataResult<ProductRate[]>>(`http://localhost:8080/api/productRates`, {
    headers: { 
      Authorization: `Bearer ${accessToken}` 
    }
  });
  return result;
}