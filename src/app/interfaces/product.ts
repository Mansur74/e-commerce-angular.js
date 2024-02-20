import { Shop } from './Shop';
import { Category } from "./Category"
import { ProductReview } from './ProductReview';

export interface Product {
  id? : number,
  sku?: string,
  name?: string,
  description?: string, 
  price?: number,
  color?: string,
  stock?: number,
  imgURL?: string 
  categories?: Category[],
  reviews?: ProductReview[],
  shop?: Shop
}
