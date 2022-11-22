// 分页返回数据
export interface PaginationReturnData<T> {
  total: number
  list: T[]
}

export type SignIn = {
  email:    string
  password:  string
}
