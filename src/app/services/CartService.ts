import axios from "axios";
import { DataResult } from "../interfaces/DataResult";
import { Cart } from "../interfaces/Cart";
import { Result } from "../interfaces/Result";
import { getAccessToken, getRefreshToken } from "./AuthService";

export const getAllCarts = async () => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.get<DataResult<Cart[]>>(`http://localhost:8080/api/cart`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const createCart = async (cart: Cart, userId: number, productId: number) => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.post<Result>(`http://localhost:8080/api/cart?userId=${userId}&productId=${productId}`, cart, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const updateCart = async (cart: Cart, cartId: number) => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.put<Result>(`http://localhost:8080/api/cart/${cartId}`, cart, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}

export const deleteCart = async (cartId: number) => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.delete<Result>(`http://localhost:8080/api/cart/${cartId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
  return result;
}