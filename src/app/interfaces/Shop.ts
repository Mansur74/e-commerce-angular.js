import { Product } from './Product';
import { User } from './User';
export interface Shop {
  id?: number,
  name?: string,
  description?: string,
  foundedAt?: Date,
  user?: User,
  products?: Product[]
}