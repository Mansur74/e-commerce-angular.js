export interface PageResult <T> {
  pageNo: number,
  pageSize: number,
  totalpages: number,
  rows : T[]
}
