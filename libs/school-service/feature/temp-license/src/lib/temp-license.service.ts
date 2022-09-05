import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TempLicenseService {
  constructor(private http: HttpClient) {}

  searchIdCard(schoolId: string, idCard: string): Observable<any> {
    return this.http
      .get(
        `${environment.apiUrl}/kspschoolregister/schstaffsearchidcardno?idCardNo=${idCard}&schoolId=${schoolId}&tokenkey=${environment.token}`
      )
      .pipe(shareReplay());
  }

  getSchoolInfo(schoolId: string) {
    return this.http
      .get(
        `${environment.apiUrl}/kspschoolregister/schschoolsearchschoolid?schoolId=${schoolId}&tokenkey=${environment.token}`
      )
      .pipe(shareReplay());
  }

  addTempLicense(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspschoolregister/schtmplicencerequestinsert`,
      {
        ...payload,
        tokenkey: environment.token,
      }
    );
  }
}
