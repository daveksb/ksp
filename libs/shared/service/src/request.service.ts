import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  createRequest(form: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/schrequestinsert`,
      form
    );
  }

  updateRequest(form: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/schrequestupdate`,
      form
    );
  }

  changeRequestProcess(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/schrequestupdatecurrentprocess`,
      payload
    );
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

  searchRegisterRequest(payload: any): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl}/kspstaff/schrequestsearchjoinschschool`,
        payload
      )
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }

  searchLicenseRequest(payload: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/e-service/requestsearch`, payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }

  getRequestById(id: number) {
    return this.http
      .post(`${environment.apiUrl}/kspstaff/schrequestselectidall`, {
        id: `${id}`,
      })
      .pipe(shareReplay());
  }

  seachSchool(payload: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/kspstaff/schschoolselect`, payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }

  loadFile(payload: any) {
    return this.http
      .post(`${environment.apiUrl}/kspstaff/schrequestfileselectbyid`, payload)
      .pipe(shareReplay());
  }

  getActiveUserSchool(payload: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/kspstaff/schschoolselect`, payload)
      .pipe(shareReplay());
  }
}
