import axios from "axios";
import { DataResult } from "../interfaces/DataResult";
import { Product } from "../interfaces/Product";
import { getAccessToken, getRefreshToken } from "./AuthService";
import { ProductFilter } from "../interfaces/ProductFilter";
import { PageResult } from "../interfaces/PageResult";

export const getAllProducts = async (productFilter: ProductFilter, pageNumber: number, pageSize: number) => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.post<DataResult<PageResult<Product>>>(`http://localhost:8080/api/products?pageNumber=${pageNumber}&pageSize=${pageSize}`, productFilter, {
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
