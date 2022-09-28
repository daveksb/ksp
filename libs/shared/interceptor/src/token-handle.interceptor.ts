import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { getCookie } from '@ksp/shared/utility';

@Injectable({
  providedIn: 'root',
})
export class TokenHandleInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = getCookie('userToken');

    if (
      request.url.includes('kspmasterdata') ||
      request.url.includes('ksplogin') ||
      request.url.includes('ksppublic') ||
      request.url.includes('schschoolselect') ||
      request.url.includes('kspfileinsert') ||
      token == ''
    ) {
      return next.handle(request);
    }

    if (request.method === 'GET') {
      const newRequest = request.clone({
        url: request.url + `&tokenkey=${token}`,
      });

      return next.handle(newRequest);
    }

    if (request.method === 'POST') {
      request = request.clone({
        body: { ...request.body, tokenkey: token },
      });
      return next.handle(request);
    }

    return next.handle(request);
  }
}
