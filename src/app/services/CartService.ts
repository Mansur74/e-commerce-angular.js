import axios from "axios";
import { DataResult } from "../interfaces/DataResult";
import { Cart } from "../interfaces/Cart";
import { Result } from "../interfaces/Result";

export const getAllCarts = async () => {
  const result = await axios.get<DataResult<Cart[]>>(`http://localhost:8080/api/cart`);
  return result;
}

export const createCart = async (cart: Cart, userId: number, productId: number) => {
  const result = await axios.post<Result>(`http://localhost:8080/api/cart?userId==${userId}&&productId==${productId}`);
  return result;
}