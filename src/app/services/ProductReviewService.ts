import axios from "axios";
import { ProductReview } from "../interfaces/ProductReview";
import { Result } from "../interfaces/Result";
import { getAccessToken, getRefreshToken } from "./AuthService";

export const createProductReview = async (productReview: ProductReview, userId: number, productId: number) => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.post<Result>(`http://localhost:8080/api/productReview?userId=${userId}&productId=${productId}`, productReview, {
    headers: { 
      Authorization: `Bearer ${accessToken}` 
    }
  });
  return result;
}

export const deleteProductReview = async (reviewId: number) => {
  const refreshToken = getRefreshToken();
  const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
  const result = await axios.delete<Result>(`http://localhost:8080/api/productReview/${reviewId}`, {
    headers: { 
      Authorization: `Bearer ${accessToken}` 
    }
  });
  return result;
}