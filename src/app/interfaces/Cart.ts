import { Product } from './Product';
export interface Cart {
  id? : number,
  quantity?: number,
  Product?: Product
}