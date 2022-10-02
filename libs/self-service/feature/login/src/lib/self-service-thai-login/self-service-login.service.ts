import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { SelfMyInfo } from '@ksp/shared/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelfServiceLoginService {
  constructor(private http: HttpClient) {}

  validateLogin(form: any): Observable<SelfMyInfo> {
    return this.http.post<SelfMyInfo>(
      `${environment.apiUrl}/ksplogin/userloginselfmyinfo`,
      form
    );
  }
}
