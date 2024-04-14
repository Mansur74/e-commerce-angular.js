import { Shop } from './Shop';
import { ShopRate } from './ShopRate';
import { User } from './User';
export interface ShopReview {
  id?: number,
  user?: User,
  shop?: Shop,
  review?: string,
  rate?: ShopRate
}