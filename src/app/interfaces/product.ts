import { Shop } from './Shop';
import { Category } from "./Category"
import { ProductReview } from './ProductReview';
import { ProductRate } from './ProductRate';

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
  rates?: ProductRate[],
  shop?: Shop
}
