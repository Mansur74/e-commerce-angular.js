import axios from "axios"
import { DataResult } from "../interfaces/DataResult";
import { Category } from "../interfaces/Category";

export const getAllCategories = () => {
  const result = axios.get<DataResult<Category[]>>(`http://localhost:8080/api/category`);
  return result;
}