import {JwtHelperService} from '@auth0/angular-jwt';
export const onlyNumbers = (value: any) => {
  const key = value.charCode;
  return key >= 48 && key <= 57;
};

export const onlyLetters = (value: KeyboardEvent): boolean => {
  const key = value.keyCode || value.which;
  let tecla = String.fromCharCode(key).toLowerCase();
  let letters = " áéíóúabcdefghijklmnñopqrstuvwxyzñ";
  let specials = [8, 37, 39];
  let tecla_especial = false;
  for (let i in specials) {
    if (key == specials[i]) {
      tecla_especial = true;
      break;
    }
  }

  return !(letters.indexOf(tecla) == -1 && !tecla_especial);
}

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
