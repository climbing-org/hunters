import { Session } from '../classes/session';
import * as jwt_decode from 'jwt-decode';

// declare const jwt_decode: any;
const localStorageKeyJWT = 'token';

export class JWTHelper {
  static getToken(): string {
    return localStorage.getItem(localStorageKeyJWT) || '';
  }

  static setToken(token: string) {
    localStorage.setItem(localStorageKeyJWT, token);
  }

  static removeToken() {
    localStorage.removeItem(localStorageKeyJWT);
  }

  static decodeSession(token: string): Session {
    return jwt_decode(token).Session;
  }
}
