import { Product } from "./Product"
import { User } from "./User"

export interface ProductRate {
  userId?: number,
  productId?: number,
  user?: User,
  product?: Product,
  rate?: number
}