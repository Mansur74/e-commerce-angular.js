import axios from "axios";
import { ProductRate } from "../interfaces/ProductRate";
import { DataResult } from "../interfaces/DataResult";
import { Result } from "../interfaces/Result";

export const createProductRate = (productRate: ProductRate, userId: number, productId: number ) => {
  const result = axios.post<Result>(`http://localhost:8080/api/productRate?userId=${userId}&productId=${productId}`);
  return result;
}

export const getProductRateById = (userId: number, productId: number ) => {
  const result = axios.get<DataResult<ProductRate>>(`http://localhost:8080/api/productRate?userId=${userId}&productId=${productId}`);
  return result;
}

export const getAllProductRates = () => {
  const result = axios.post<DataResult<ProductRate[]>>(`http://localhost:8080/api/productRates`);
  return result;
}