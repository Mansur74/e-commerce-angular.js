import axios from "axios";
import { DataResult } from "../interfaces/DataResult";
import { Shop } from "../interfaces/Shop";

export const getAllShops = async (accessToken: string) => {
  const result = await axios.get<DataResult<Shop[]>>(`http://localhost:8080/api/shop`, {
    headers: { 
      Authorization: `Bearer ${accessToken}` 
    }
  });
  return result;
}

export const getShopById = async (accessToken: string, shopId: number) => {
  const result = await axios.get<DataResult<Shop>>(`http://localhost:8080/api/shop/${shopId}`, {
    headers: { 
      Authorization: `Bearer ${accessToken}` 
    }
  });
  return result;
}