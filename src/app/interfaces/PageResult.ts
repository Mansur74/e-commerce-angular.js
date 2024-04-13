export interface PageResult <T> {
  pageNo: number,
  pageSize: number,
  totalPages: number,
  rows : T[]
}
