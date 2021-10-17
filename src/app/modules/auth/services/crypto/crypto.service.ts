import {Injectable} from '@angular/core';
import {cryptoAlgorithm} from "@app/modules/auth/models/crypto/crypto.enum";
import {
  CryptoCurvedParams,
  CryptoIvParams,
  CryptoSigningParams,
  KeyGeneration
} from "@app/modules/auth/models/crypto/crypto.model";

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  public getRandomNumber(length: number): Uint8Array {
    const numbers: Uint8Array = new Uint8Array(length);
    crypto.getRandomValues(numbers);
    return numbers;
  }

  public async stringToHash(value: string): Promise<string> {
    const toHex = (x: any) => x.toString(16).padStart(2, "0");

    const encodedString: Uint8Array = this.encode(value);
    const digest: ArrayBuffer = await crypto.subtle.digest(
      "SHA-256",
      encodedString
    );
    const buffer: Uint8Array = new Uint8Array(digest);
    return Array.from(buffer)
      .map(toHex)
      .join("");
  }

  public async generateKeyEncryptionDecryption(algorithm: cryptoAlgorithm): Promise<CryptoKey> {
    const paramsKeyGeneration: KeyGeneration = {
      name: algorithm,
      length: 256
    };
    return await crypto.subtle.generateKey(paramsKeyGeneration, true, [
      "encrypt",
      "decrypt"
    ]);
  }

  public async generateKeySigning(
    algorithm: cryptoAlgorithm
  ): Promise<CryptoKeyPair> {
    const paramsKeyCurved: CryptoCurvedParams = {
      name: algorithm,
      namedCurve: "P-256"
    };
    return await crypto.subtle.generateKey(paramsKeyCurved, true, [
      "sign",
      "verify"
    ]);
  }

  public generateParamsEncryptionDecryption(
    algorithm: cryptoAlgorithm
  ): CryptoIvParams {
    return {
      name: algorithm,
      iv: crypto.getRandomValues(new Uint8Array(16))
    };
  }

  public generateParamsSigning(
    algorithm: cryptoAlgorithm
  ): CryptoSigningParams {
    return {
      name: algorithm,
      hash: "SHA-256"
    };
  }

  // verschlüsseln
  public async encryptValue(
    value: string,
    key: CryptoKey,
    paramsEncryption: CryptoIvParams
  ): Promise<ArrayBuffer> {
    const encodedString: Uint8Array = this.encode(value);
    return await crypto.subtle.encrypt(paramsEncryption, key, encodedString);
  }

  // entschlüsseln
  public async decryptValue(
    value: ArrayBuffer,
    key: CryptoKey,
    paramsDecryption: CryptoIvParams
  ): Promise<string> {
    const decryptedBuffer = await crypto.subtle.decrypt(
      paramsDecryption,
      key,
      value
    );
    return this.decode(decryptedBuffer);
  }

  // signieren
  public async sign(
    value: string,
    key: CryptoKey,
    params: CryptoSigningParams
  ): Promise<ArrayBuffer> {
    const encodedString: Uint8Array = this.encode(value);
    return await crypto.subtle.sign(params, key, encodedString);
  }

  // verifizieren
  public async verify(
    value: string,
    key: CryptoKey,
    params: CryptoSigningParams,
    signature: ArrayBuffer
  ): Promise<boolean> {
    const encodedString: Uint8Array = this.encode(value);
    return await crypto.subtle.verify(params, key, signature, encodedString);
  }

  private encode(value: string): Uint8Array {
    const textEncoder = new TextEncoder();
    return textEncoder.encode(value);
  }

  private decode(value: ArrayBuffer): string {
    const textDecoder = new TextDecoder();
    return textDecoder.decode(value);
  }
}
