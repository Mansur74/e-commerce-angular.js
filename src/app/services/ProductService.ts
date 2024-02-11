import axios from "axios";
import { DataResult } from "../interfaces/DataResult";
import { Product } from "../interfaces/Product";

export const getAllProducts = async () => {
  const result = await axios.get<DataResult<Product[]>>(`http://localhost:8080/api/product`);
  return result;
}