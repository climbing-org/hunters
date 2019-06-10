import {tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse, HttpErrorResponse, HttpResponseBase
} from '@angular/common/http';

import { SecurityService } from '../services/security.service';
import { Router } from '@angular/router';
import {JWTHelper} from '../helpers/jwt.helper';
import { ToastrService } from 'ngx-toastr';

const headerJWT = 'Authorization';
const headerNewJWT = 'token-new';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {

  constructor(
    private ss: SecurityService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Инжектим JWT
    const reqClone = this.injectJWTHeader(req);

    // Выполняем запрос и обрабатываем ответ
    return next
    .handle(reqClone)
    .pipe(
      tap(
        // Если получили штатный ответ
        event => {

          if (event instanceof HttpResponse) {
            // Обновляем сессию, если сервер выдал новый JWT
              if (event && event.body && (event.body.code === 403 || event.body.code === 401)) {
                  this.ss.logout();
                  this.router.navigateByUrl('/login');
              }
              if (event.url !== 'https://androidios.kz:8000/api/v1/tinymce-upload/') {
                  if (req.method === 'DELETE') {
                      if (event && ((event.body && event.body.code === 0) || event.status === 204)) {
                          this.toastr.success('Успешно удалено', 'Успешно удалено!');
                      } else {
                          let message = 'Возникли ошибки при удалении';
                          if (event && event.body && event.body) {
                              message = event.body.message;
                          }
                          this.toastr.error('Возникли ошибки', message);
                      }
                  }
                  if (req.method === 'POST') {
                      if (event && ((event.body && event.body.code === 0) || event.status === 204)) {
                          if (event.url !== 'https://androidios.kz:8000/api/v1/login/') {
                              this.toastr.success('Запрос прошел успешно', 'Успешно!');
                          }
                      } else {
                          let message = 'Возникли ошибки';
                          if (event && event.body && event.body) {
                              message = event.body.message;
                          }
                          this.toastr.error('Возникли ошибки', message);
                      }
                  }
                  if (req.method === 'PUT' || req.method === 'PATCH') {
                      if (event && ((event.body && event.body.code === 0) || event.status === 204)) {
                          this.toastr.success('Запрос прошел успешно', 'Успешно!');
                      } else {
                          let message = 'Возникли ошибки';
                          if (event && event.body && event.body) {
                              message = event.body.message;
                          }
                          this.toastr.error('Возникли ошибки', message);
                      }
                  }
              }
            // this.updateSession(event);
          }
        },
        // Если сервер вернул ошибку
        error => {
          if (error instanceof HttpErrorResponse) {

            // Обновляем сессию, если сервер выдал новый JWT
              console.log('2222222222222222222');
            // this.updateSession(error);
          }
        }
      )
    );
  }

  private injectJWTHeader(req: HttpRequest<any>): HttpRequest<any> {
      if (JWTHelper.getToken()) {
          return req.clone({
              headers: req.headers.set(headerJWT, `Token ${JWTHelper.getToken()}`)
          });
      }
      return req.clone({
      });
  }

  private updateSession(res: any) {
    if (res instanceof HttpResponseBase) {
      const newToken = res.headers.get(headerNewJWT);
      if (newToken) {
        this.ss.onNewToken(newToken);
      }
    }
  }
}
