import {JwtHelperService} from '@auth0/angular-jwt';

export const onlyNumbers = (value: any): boolean => {
  const key = value.charCode;
  return key >= 48 && key <= 57;
};

const helper: JwtHelperService = new JwtHelperService();

export const GetTokenData = (token: string): any => {
  if (token) return helper.decodeToken(token);
  return null;
}

export const IsInvalidToken = (token: string): boolean => {
  if (token) return helper.isTokenExpired(token);

  return true;
}

export const GetTokenExpirationDate = (token: string): Date | null => {
  let expirationDate: Date | null = null;
  if (token) {
    expirationDate = helper.getTokenExpirationDate(token);
  }
  return expirationDate;
}

export const GetExtensionOfBase64 = (base64: string): string => {
  const signatures = {
    pdf: "PDF",
    gif: "GIF",
    gif2: "GIF",
    png: "PNG",
    jpg: "JPG"
  };
  if (base64.indexOf('JVBERi0') !== -1) return signatures.pdf;
  if (base64.indexOf('R0lGODdh') !== -1) return signatures.gif;
  if (base64.indexOf('R0lGODlh') !== -1) return signatures.gif2;
  if (base64.indexOf('iVBORw0KGgo') !== -1) return signatures.png;
  if (base64.indexOf('/9j/') !== -1) return signatures.jpg;
  return 'JPG';
}

export const GetMimeTypeOfBase64 = (base64: string): string => {
  const signatures = {
    pdf: "application/pdf",
    gif: "image/gif",
    gif2: "image/gif",
    png: "image/png",
    jpg: "image/jpg"
  };
  if (base64.indexOf('JVBERi0') !== -1) return signatures.pdf;
  if (base64.indexOf('R0lGODdh') !== -1) return signatures.gif;
  if (base64.indexOf('R0lGODlh') !== -1) return signatures.gif2;
  if (base64.indexOf('iVBORw0KGgo') !== -1) return signatures.png;
  if (base64.indexOf('/9j/') !== -1) return signatures.jpg;
  return 'image/jpg';
}
