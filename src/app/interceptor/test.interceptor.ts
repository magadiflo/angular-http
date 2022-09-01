import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TestInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const API_TOKEN = 'asdfasdf56516asdfa6s5d16asdf51651';
    const requestCopy = request.clone({
      setHeaders: { API_KEY: API_TOKEN },
      body: { hello: 'World!!' },
    });
    console.log(requestCopy);
    return next.handle(requestCopy);
  }
}
