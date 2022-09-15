import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { getCookie } from '@ksp/shared/utility';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  checkAuth(): Observable<boolean> {
    const tokenKey = getCookie('userToken');
    if (tokenKey) return of(true);
    this.router.navigate(['/']);
    return of(false);
    // return this.schoolServiceFeatureLoginService
    //   .validateTokenKey(tokenKey)
    //   .pipe(
    //     switchMap(() => {
    //       return of(true);
    //     }),
    //     catchError(() => {
    //       return of(false);
    //     })
    //   );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkAuth();
  }
}
