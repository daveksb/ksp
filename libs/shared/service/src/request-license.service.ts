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

  //https://kspapi.oceanicnetwork.net/ksp/kspstaff/schrequestsearchjoinschschool

  searchLicenseRequest(payload: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/e-service/requestsearch`, payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }

  //https://kspapi.oceanicnetwork.net/ksp/e-service/request-search

  getRequestById(id: number) {
    return this.http
      .post(`${environment.apiUrl}/kspstaff/schrequestselectidall`, {
        id: `${id}`,
      })
      .pipe(
        shareReplay()
        //map((data: any) => data.datareturn)
      );
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
