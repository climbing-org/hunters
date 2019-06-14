import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JWTHelper } from '../helpers/jwt.helper';
import {tap} from 'rxjs/operators';
import {GeneralHelper} from '../helpers/general.helper';
import { Session } from '../classes/session';
import User from '../classes/user';

export interface LoginForm {
    email: string;
    password: string;
}

@Injectable()
export class SecurityService {
  constructor(
    private http: HttpClient,
  ) {}

  static sessionUpdateEvent = new EventEmitter<Session>();
  static sessionCloseEvent = new EventEmitter<any>();

  private session: Session = null;
  static session: Session = null;

  private user: User = null;

  // Только для вызова из InitService.
  onBootstrap(): Session {
    const token = JWTHelper.getToken();
    // Alisher
    // if (token) {
    //   this.session = JWTHelper.decodeSession(token);
    //   SecurityService.session = this.session;
    //   SecurityService.sessionUpdateEvent.emit(this.session);
    //   return this.session;
    // }
    return null;
  }

  onNewToken(token: string) {
    JWTHelper.setToken(token);
    this.session = JWTHelper.decodeSession(token);
  }

  getSession(): Session {
    return this.session;
  }

  getUser(): User {
      if (!this.user) {
          const userString = localStorage.getItem('user');
          if (userString) {
              this.user = JSON.parse(userString);
          }
      }
      return this.user;
  }

  // Alisher
    getToken() {
        return JWTHelper.getToken();
    }

  getSessionObject(): Session {
    return this.session;
  }

  login(input: LoginForm): Observable<any> {
      console.log(input);
    return this.http
      .post<Session>('http://185.22.64.192:8000/api/v1/login/', input)
      .pipe(
        // tap({
        //   next: () => GeneralHelper.reloadApp(),
        // })
      );
  }

  register(body: any): Observable<any> {
    // const baseUrl = `/api/organizations/any?agree=${agree}&links=${links}&ticket=${code}`;
    return this.http.post<any>('', body);
  }

  logout() {
    JWTHelper.removeToken();
    // GeneralHelper.reloadApp();
    SecurityService.sessionCloseEvent.emit();
  }
}
