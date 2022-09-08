import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SchoolServiceFeatureLoginService } from '@ksp/school-service/feature/login';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private schoolServiceFeatureLoginService: SchoolServiceFeatureLoginService,
    private router: Router
  ) {}

  checkAuth(): Observable<boolean> {
    const tokenKey =
      this.schoolServiceFeatureLoginService.getCookie('schUserToken');
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
