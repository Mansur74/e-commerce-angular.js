import { Product } from "./Product";
import { ProductRate } from "./ProductRate";
import { User } from "./User";

export interface ProductReview{
  id?: number,
  review?: string,
  user?: User,
  product?: Product,
  rate?: ProductRate
}