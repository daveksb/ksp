import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { SchForgetPassword } from '@ksp/shared/interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchoolUserService {
  constructor(private http: HttpClient) {}

  checkForgetPassword(payload: SchForgetPassword): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/ksppublic/schusercheckschoolidandidcardno`,
      payload
    );
  }

  setForgetPassword(payload: SchForgetPassword): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/ksppublic/schuserupdatepass`,
      payload
    );
  }
}
