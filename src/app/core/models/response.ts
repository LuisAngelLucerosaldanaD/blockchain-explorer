export interface Response<T = any> {
  code: number;
  data: T;
  error: boolean
  msg: string;
  type: number;
}

