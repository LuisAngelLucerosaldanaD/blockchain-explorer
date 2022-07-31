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

