import { Product } from "./Product"
import { ProductReview } from "./ProductReview"
import { User } from "./User"

export interface ProductRate {
  userId?: number,
  productId?: number,
  user?: User,
  product?: Product,
  reviews?: ProductReview[]
  rate?: number
}