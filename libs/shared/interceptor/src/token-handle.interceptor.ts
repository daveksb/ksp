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
    const token = getCookie('userToken') || null;
    if (
      request.url.includes('ksprequestinsertforisforeign') ||
      request.url.includes('selfmyinfoinsert') ||
      request.url.includes('kspmasterdata') ||
      request.url.includes('ksplogin') ||
      request.url.includes('ksppublic') ||
      request.url.includes('schschoolselect') ||
      (request.url.includes('kspfileinsert') &&
        (request.body.requesttype == '1' || request.body.requesttype == '2')) ||
      request.url.includes('schschoolsearch.php') ||
      (request.url.includes('schrequestfileinsert') &&
        (request.body.requesttype == '1' ||
          request.body.requesttype == '2')) /*||
      !token */
    ) {
      return next.handle(request);
    }

    if (request.method === 'GET') {
      const tokenkey = request.url.includes('?')
        ? `&tokenkey=${token}`
        : `?tokenkey=${token}`;
      const newRequest = request.clone({
        url: request.url + tokenkey,
      });

      return next.handle(newRequest);
    }

    if (request.method === 'POST') {
      //console.log('token url = ', request.url);
      request = request.clone({
        body: { ...request.body, tokenkey: token },
      });
      return next.handle(request);
    }

    return next.handle(request);
  }
}
