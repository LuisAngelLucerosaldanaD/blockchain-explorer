export interface Login {
  nickname: string;
  password: string;
}

export interface LoginResponse {
  data: Token;
  code: number;
  type: string;
  msg: string;
  error: boolean;
}

export interface Token {
  access_token: string;
  refresh_token: string;
}

export interface User {
  name: string;
  lastname: string;
  nickname: string;
  password: string;
  confirm_password: string;
  email: string;
  confirm_email: string;
  birth_date: string;
  cellphone: string;
  confirm_cellphone: string;
  id_type: string;
  id_number: string;
  id_city: string;
}


export interface UserResponse {
  error: boolean;
  data: User;
  code: number;
  type: string;
  msg: string;
}

export interface ActivateAccountModel {
  code: string;
}


export interface ActivateAccountResponse {
  data: any;
  code: number;
  type: string;
  error: boolean;
  msg: string;
}
