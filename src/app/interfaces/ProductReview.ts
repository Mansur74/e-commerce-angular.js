import { Product } from "./Product";
import { User } from "./User";

export interface ProductReview{
  id?: number,
  review?: string,
  user?: User,
  product?: Product
}