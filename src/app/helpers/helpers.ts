import {JwtHelperService} from '@auth0/angular-jwt';
export const onlyNumbers = (value: any) => {
  const key = value.charCode;
  return key >= 48 && key <= 57;
};

const helper = new JwtHelperService();

export const getTokenUser = (token: string) => {
  let user: any;
  if (token) {
    user = helper.decodeToken(token);
  }
  return user;
}

export const getTokenExpirationDate = (token: string) => {
  let expirationDate: any;
  if (token) {
    expirationDate = helper.getTokenExpirationDate(token);
  }
  return expirationDate;
}

export const isTokenExpired = (token: string) => {
  if (token) {
    return helper.isTokenExpired(token);
  } else {
    return true;
  }
}
