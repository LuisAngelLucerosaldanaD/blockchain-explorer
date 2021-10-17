export interface KeyGeneration {
  name: string;
  length: number;
}

export interface CryptoIvParams {
  name: string;
  iv: Uint8Array;
}

export interface CryptoCurvedParams {
  name: string;
  namedCurve: string;
}

export interface CryptoSigningParams {
  name: string;
  hash: string;
}
