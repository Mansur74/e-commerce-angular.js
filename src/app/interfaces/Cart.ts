import { Product } from './Product';
import { User } from './User';
export interface Cart {
  id? : number,
  quantity?: number,
  user?: User,
  product?: Product
}