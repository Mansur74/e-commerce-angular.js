import { Shop } from "./Shop";
import { ShopReview } from "./ShopReview";
import { User } from "./User";

export interface ShopRate {
  shopId?: number,
  userId?: number,
  shop?: Shop,
  user?: User,
  rate?: number,
  reviews?: ShopReview[]
}