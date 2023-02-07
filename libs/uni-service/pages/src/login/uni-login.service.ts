import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UniLoginService {
  constructor(private http: HttpClient) {}
  validateLogin(form: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/ksplogin/userloginuniuser`,
      form
    );
  }

  forgotPassword(form: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspuni/uniuserupdatepass`,
      form
    );
  }

  checkUser(form: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/ksppublic/uniusercheckuser`,
      form
    );
  }
}
