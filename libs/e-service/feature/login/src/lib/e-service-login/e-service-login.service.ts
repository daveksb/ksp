import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EServiceLoginService {
  constructor(private http: HttpClient) {}
  config: any;

  validateLogin(form: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/ksplogin/userloginesuser`,
      form
    );
  }

  /* validateTokenKey(token: string): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/ksplogin/userloginschuser`, token)
      .pipe(map((data: any) => data.datareturn));
  } */
}
