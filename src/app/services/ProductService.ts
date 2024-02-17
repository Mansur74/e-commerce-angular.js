import axios from "axios";
import { DataResult } from "../interfaces/DataResult";
import { Product } from "../interfaces/Product";

export const getAllProducts = async (accessToken: string) => {
  const result = await axios.get<DataResult<Product[]>>(`http://localhost:8080/api/product`, {
    headers: { 
      Authorization: `Bearer ${accessToken}` 
    }
  });
  return result;
}

export const getProductById = async (id: string, accessToken: string) => {
  const result = await axios.get<DataResult<Product>>(`http://localhost:8080/api/product/${id}`, {
    headers: { 
      Authorization: `Bearer ${accessToken}` 
    }
  });
  return result;
}
