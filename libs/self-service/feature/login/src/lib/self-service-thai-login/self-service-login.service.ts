import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelfServiceLoginService {
  constructor(private http: HttpClient) {}
  config: any;

  validateLogin(form: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/ksplogin/userloginselfmyinfo`,
      form
    );
  }
}
