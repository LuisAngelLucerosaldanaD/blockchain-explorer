export interface Account {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirm_password: string;
  id_type: number;
  id_number: string;
  nickname: string;
  cellphone: string;
  birth_date: string;
}

export interface ResponseCreateAccount {
  error: boolean;
  data: User
  code: number;
  type: number;
  msg: string;
}

export interface User {
  id: number;
  name: string;
  lastName: string;
  password: string;
  email: string;
  nickname: string;
  cellphone: string;
  birth_date: string;
  id_type: number;
  id_number: string;
  created_at: string;
  updated_at: string;
}

export interface ResponseCreateWallet {
  error: boolean;
  data: any
  code: number;
  type: number;
  msg: string;
}
