import { Product } from './Product';
import { ShopRate } from './ShopRate';
import { ShopReview } from './ShopReview';
import { User } from './User';
export interface Shop {
  id?: number,
  name?: string,
  description?: string,
  foundedAt?: string,
  user?: User,
  products?: Product[],
  reviews?: ShopReview[],
  rates?: ShopRate[]
}