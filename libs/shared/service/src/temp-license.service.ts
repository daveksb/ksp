import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TempLicenseService {
  constructor(private http: HttpClient) {}

  searchStaffFromIdCard(schoolId: string, idCard: string): Observable<any> {
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
      .pipe(
        shareReplay()
        //map((data: any) => data.datareturn)
      );
  }

  searchRequest(payload: any): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl}/kspschoolregister/schtmplicencerequestselect`,
        {
          ...payload,
          tokenkey: environment.token,
        }
      )
      .pipe(map((data: any) => data.datareturn));
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
