import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { SchoolRequest, SelfRequest } from '@ksp/shared/interface';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ERequestService {
  constructor(private http: HttpClient) {}

  searchRequest(payload: any): Observable<SelfRequest[]> {
    return this.http
      .post(`${environment.apiUrl}/e-service/requestandschoolsearchs`, payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }

  searchSelfRequest(payload: any): Observable<SelfRequest[]> {
    return this.http
      .post(
        `${environment.shortApiUrl}/schrequestsearch_e-service.php`,
        payload
      )
      .pipe(map((data: any) => data.datareturn));
  }

  getRequestById(requestId: number): Observable<SelfRequest> {
    return this.http.post<SelfRequest>(
      `${environment.apiUrl}/e-service/requestsearchbyrequestno`,
      {
        id: requestId,
      }
    );
  }

  checkRequest(payload: any): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl}/kspstaff/schrequestupdatechecksubresult`,
        payload
      )
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }

  /* approveUserRequest(payload: any): Observable<SchoolRequest[]> {
    return this.http
      .post(`${environment.apiUrl}/e-service/schuserinsert`, payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  } */

  approveUser(payload: any): Observable<SchoolRequest[]> {
    return this.http
      .post(`${environment.apiUrl}/e-service/schuserinsert`, payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }

  retiredUser(payload: any): Observable<SchoolRequest[]> {
    return this.http
      .post(`${environment.apiUrl}/e-service/useractiveupdate`, payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }
}
