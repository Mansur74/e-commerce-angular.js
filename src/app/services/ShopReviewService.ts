import axios from "axios";
import { Result } from "../interfaces/Result";
import { ShopReview } from "../interfaces/ShopReview";
import { getAccessToken, getRefreshToken } from "./AuthService";

export const createShopReview = async (shopReview: ShopReview, userId: number, shopId: number) => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.post<Result>(`http://localhost:8080/api/shopReview?userId=${userId}&shopId=${shopId}`, shopReview, {
    headers: { 
      Authorization: `Bearer ${accessToken}` 
    }
  });
  return result;
}

export const deleteShopReview = async (reviewId: number) => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.delete<Result>(`http://localhost:8080/api/shopReview/${reviewId}`, {
    headers: { 
      Authorization: `Bearer ${accessToken}` 
    }
  });
  return result;
}