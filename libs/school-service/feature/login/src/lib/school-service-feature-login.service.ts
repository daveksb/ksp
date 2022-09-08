import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchoolServiceFeatureLoginService {
  constructor(private http: HttpClient) {}

  validateLogin(form: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/ksplogin/userloginschuser`,
      form
    );
  }
  validateTokenKey(token: string): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/ksplogin/userloginschuser`, token)
      .pipe(map((data: any) => data.datareturn));
  }
  setCookie(key: string, value: string | number, exdays: number) {
    const currentDate = new Date();
    currentDate.setTime(currentDate.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + currentDate.toUTCString();
    document.cookie = key + '=' + value + ';' + expires + ';path=/';
  }

  getCookie(cname: string) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  deleteCookie(name: string) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
  }
}
