import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import {
  EsSearchPayload,
  KspApprovePayload,
  KspRequest,
  KspResponse,
  SchKuruspaNumber,
  SchUser,
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
  KspApproveRequest(payload: KspApprovePayload): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/ksprequestprocessinsert`,
      payload
    );
  }

  // new API
  getKspRequestById(id: number): Observable<KspRequest> {
    return this.http.post<KspRequest>(
      `${environment.apiUrl}/e-service/ksprequestselectbyid`,
      {
        id,
      }
    );
  }

  // new API
  getApproveHistory(requestid: string): Observable<SelfRequest[]> {
    return this.http
      .post(
        `${environment.apiUrl}/e-service/ksprequestprocessselectbyrequestid`,
        { requestid }
      )
      .pipe(map((data: any) => data.datareturn));
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

  createSchUser(payload: SchUser): Observable<KspResponse> {
    return this.http.post<KspResponse>(
      `${environment.apiUrl}/e-service/schuserinsert`,
      payload
    );
  }

  retiredUser(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/useractiveupdate`,
      payload
    );
  }
  createSchKuruspaNumber(payload: Partial<SchKuruspaNumber>): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/e-service/schkuruspanoinsertupdate`, payload)
      .pipe(map((data: any) => data.datareturn));
  }
}
