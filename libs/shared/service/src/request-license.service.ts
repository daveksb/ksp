import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestLicenseService {
  constructor(private http: HttpClient) {}

  requestLicense(form: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/kspstaff/schrequestinsert`, form)
      .pipe(shareReplay());
  }

  getSchoolInfo(schoolId: string): Observable<any> {
    return this.http
      .get(
        `${environment.apiUrl}/kspschoolregister/schschoolsearchschoolid?schoolId=${schoolId}`
      )
      .pipe(shareReplay());
  }

  searchRequest(payload: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/kspstaff/schrequestsearch`, payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }
}
