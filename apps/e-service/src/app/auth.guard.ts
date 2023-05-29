import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { getCookie, setCookie } from '@ksp/shared/utility';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private route: ActivatedRoute) {}

  checkAuth(): Observable<boolean> {
    const tokenKey = getCookie('userToken');
    if (tokenKey) {
      return of(true);
    } else {
      this.router.navigate(['/']);
      return of(true);
    }
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (next.queryParams['token']) {
      setCookie('userToken', next.queryParams['token'] || '', 1);
      setCookie('iframeToken', 'TRUE', 1);
      return of(true);
    } else {
      return this.checkAuth();
    }
  }
}
