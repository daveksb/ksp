import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable, of, share, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CacheInterceptor implements HttpInterceptor {
  // store url and response as Map
  private cache: Map<string, HttpResponse<any>> = new Map();

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }
    //console.log('cache = ', this.cache);
    const cachedResponse: any = this.cache.get(req.url);
    //console.log('cachedResponse = ', cachedResponse);

    if (cachedResponse) {
      //console.log('cache hit = ', cachedResponse);
      return of(cachedResponse.clone());
    } else {
      return next.handle(req).pipe(
        tap((stateEvent) => {
          if (stateEvent instanceof HttpResponse) {
            this.cache.set(req.url, stateEvent.clone());
          }
        }),
        share()
      );
    }
  }
}
