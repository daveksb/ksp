import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import {
  EsSearchPayload,
  KspRequest,
  KspResponse,
  SchoolRequest,
  SchoolUser,
  SelfRequest,
} from '@ksp/shared/interface';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ERequestService {
  constructor(private http: HttpClient) {}

  // new API
  KspSearchRequest(payload: EsSearchPayload): Observable<KspRequest[]> {
    return this.http
      .post(`${environment.shortApiUrl}/ksprequestsearch_es.php`, payload)
      .pipe(map((data: any) => data.datareturn));
  }

  // new API
  KspApproveRequest(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/ksprequestprocessinsert`,
      payload
    );
  }

  // new API
  getKspRequestById(requestId: number): Observable<KspRequest> {
    return this.http.post<KspRequest>(
      `${environment.apiUrl}/e-service/ksprequestselectbyid`,
      {
        id: requestId,
      }
    );
  }

  EsSearchRequest(payload: EsSearchPayload): Observable<SelfRequest[]> {
    return this.http
      .post(`${environment.shortApiUrl}/schrequestsearch_e.php`, payload)
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

  createSchUser(payload: SchoolUser): Observable<KspResponse> {
    return this.http.post<KspResponse>(
      `${environment.apiUrl}/e-service/schuserinsert`,
      payload
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
