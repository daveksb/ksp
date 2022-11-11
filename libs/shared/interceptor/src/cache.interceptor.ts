import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { from, map, Observable, of, switchMap } from 'rxjs';
import localForage from 'localforage';
import * as moment from 'moment';
import { environment } from '@ksp/shared/environment';

@Injectable({
  providedIn: 'root',
})
export class CacheInterceptor implements HttpInterceptor {
  // cache data to indexedDB via LocalForage
  // cache will be cleared every 5 hrs
  private cacheTime = 300;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //const url = request.url.replace('https://', '').replace(/[^0-9a-z]/g, '');
    const url = request.url.replace(environment.apiUrl, '');

    const cacheControl = request.headers.get('Cache-Control');

    const newRequest = request.clone({
      headers: request.headers.delete('Cache-Control'),
    });

    if (request.method !== 'GET' || cacheControl === 'no-store') {
      return next.handle(newRequest);
    }

    return from(localForage.keys()).pipe(
      switchMap((keys) => this.getFromCache(keys, url)),
      switchMap((cache) =>
        cache
          ? of(cache)
          : next
              .handle(newRequest)
              .pipe(switchMap((data) => this.addToCache(data, url)))
      )
    );
  }

  getFromCache(keys: any, url: string): Observable<any> {
    if (!keys.includes(url)) {
      return of(null);
    }

    return from(localForage.getItem(url)).pipe(
      switchMap((item) => this.isExpired(item))
    );
  }

  addToCache(data: any, url: string) {
    const value = {
      body: data.body,
      date: moment().format(),
    };

    return of(localForage.setItem(url, value)).pipe(map(() => data));
  }

  isExpired(item: any) {
    const outOfDate =
      moment().diff(moment(item.date), 'minutes') > this.cacheTime;
    const resp = new HttpResponse({ body: item.body });

    return of(outOfDate ? null : resp);
  }
}
/*   constructor() {}
    private cache: Map<string, HttpResponse<any>> = new Map();

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }

   const cachedResponse: any = this.cache.get(req.url);
    if (cachedResponse) {
      //console.log('cache hit = ', cachedResponse);
      return of(cachedResponse.clone());
    } else {
      return next.handle(req).pipe(
        tap((httpResponse) => {
          if (httpResponse instanceof HttpResponse) {
            this.cache.set(req.url, httpResponse.clone());
          }
        }),
        share()
      );
    }
  }
 */
