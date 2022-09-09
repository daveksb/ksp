import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { getCookie } from '@ksp/shared/utility';

@Injectable({
  providedIn: 'root',
})
export class TokenHandleInterceptor implements HttpInterceptor {
  private cache = new Map<string, any>();

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = getCookie('schUserToken');

    if (
      request.url.includes('kspmasterdata') ||
      request.url.includes('ksplogin')
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

    return next.handle(request).pipe(
      tap((response) => {
        if (response instanceof HttpResponse) {
          this.cache.set(request.url, response);
        }
      })
    );
    /* const cachedResponse = this.cache.get(request.url);
    if (cachedResponse) {
      return of(cachedResponse);
    }
  } */
  }
}
