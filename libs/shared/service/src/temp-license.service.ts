import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TempLicenseService {
  constructor(private http: HttpClient) {}

  searchStaffFromIdCard(
    schoolId: string,
    idCard: string,
    tokenkey: any
  ): Observable<any> {
    return this.http
      .get(
        `${environment.apiUrl}/kspschoolregister/schstaffsearchidcardno?idCardNo=${idCard}&schoolId=${schoolId}&tokenkey=${tokenkey}`
      )
      .pipe(shareReplay());
  }

  getSchoolInfo(schoolId: string, tokenkey: string) {
    return this.http
      .get(
        `${environment.apiUrl}/kspschoolregister/schschoolsearchschoolid?schoolId=${schoolId}&tokenkey=${tokenkey}`
      )
      .pipe(shareReplay());
  }

  searchRequest(payload: any, tokenkey: any): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl}/kspschoolregister/schtmplicencerequestselect`,
        {
          ...payload,
          tokenkey,
        }
      )
      .pipe(map((data: any) => data.datareturn));
  }

  addTempLicense(payload: any, tokenkey: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspschoolregister/schtmplicencerequestinsert`,
      {
        ...payload,
        tokenkey,
      }
    );
  }

  getSchoolEduOccupy() {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/schooleduoccupy`)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }
}
