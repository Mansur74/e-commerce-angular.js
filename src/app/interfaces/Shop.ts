import { Product } from './Product';
import { User } from './User';
export interface Shop {
  id?: number,
  name?: string,
  description?: string,
  foundedAt?: string,
  user?: User,
  products?: Product[]
}