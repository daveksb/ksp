import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import {
  ESelfSearchPayload,
  EsSearchPayload,
  KspApprovePayload,
  KspRequest,
  KspResponse,
  KspKuruspa,
  SchUser,
  SelfRequest,
  UniUser,
  GetLastApproveList,
  GetLastApproveGroup,
  KspListResponse,
} from '@ksp/shared/interface';
import { getCookie } from '@ksp/shared/utility';
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
  KspUpdateRequestProcess(payload: KspApprovePayload): Observable<any> {
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

  searchRequestList(payload: any): Observable<any> {
    return this.http
      .post(`${environment.shortApiUrl}/selfapprovelistsearch.php`, payload)
      .pipe(map((data: any) => data.datareturn));
  }

  // new API
  getApproveHistory(requestid: string): Observable<SelfRequest[]> {
    return this.http
      .post(`${environment.shortApiUrl}/ksprequestprocess_systemtype.php`, {
        requestid,
      })
      .pipe(map((data: any) => data.datareturn));
  }

  deActivateAllUser(schoolid: string): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/schuseractiveupdate`,
      {
        schoolid,
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

  searchSelfRequest(payload: ESelfSearchPayload): Observable<SelfRequest[]> {
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

  createKuruspaNumber(payload: Partial<KspKuruspa>): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/schkuruspanoinsertupdate`,
      payload
    );
  }

  updateRequestKuruspaNo(
    id: string | null,
    kuruspano: string
  ): Observable<any> {
    return this.http.post(`${environment.apiUrl}/e-service/updatekuruspano`, {
      id,
      kuruspano,
    });
  }

  createUniUser(payload: UniUser): Observable<any> {
    return this.http.post(`${environment.apiUrl}/e-service/uniuserinsert`, {
      ...payload,
      tokenkey: getCookie('userToken'),
    });
  }

  kspRequestProcessSelectByRequestId(requestid: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/ksprequestprocessselectbyrequestid`,
      { requestid, tokenkey: getCookie('userToken') }
    );
  }

  kspUpdateRequestUniRequestDegree(
    payload: KspApprovePayload
  ): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/ksprequestprocessinsert_unirequestdegree`,
      payload
    );
  }

  kspUniRequestProcessSelectByRequestId(requestid: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/ksprequestprocessselectbyrequestid_requestdegree`,
      { requestid, tokenkey: getCookie('userToken') }
    );
  }
  retiredUniUser(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/uniuseractiveupdate`,
      payload
    );
  }

  getLastApproveList(): Observable<GetLastApproveList> {
    return this.http.get<GetLastApproveList>(
      `${environment.apiUrl}/e-service/selfapprovelistselectlast`,
      { headers: { 'Cache-Control': 'no-store' } }
    );
  }

  getLastApproveGroup(): Observable<GetLastApproveGroup> {
    return this.http.get<GetLastApproveGroup>(
      `${environment.apiUrl}/e-service/selfapprovegroupselectlast`,
      { headers: { 'Cache-Control': 'no-store' } }
    );
  }

  createAprroveList(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/selfapprovelistinsert`,
      payload
    );
  }

  createAprroveGroup(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/selfapprovegroupinsert`,
      payload
    );
  }

  getLevel2LicenseList(): Observable<KspListResponse<KspRequest>> {
    return this.http.get<KspListResponse<KspRequest>>(
      `${environment.shortApiUrl}/ksprequestsearch_e-self.php`,
      {
        headers: { 'Cache-Control': 'no-store' },
      }
    );
  }

  getGroupByAccount(account: string): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/selfapprovegroupsearchgroup`,
      { grouplist: account }
    );
  }

  updateApproveGroup(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/selfapprovegroupupdate`,
      payload
    );
  }

  updateApproveGroup2(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/selfapprovegroupupdate_2`,
      payload
    );
  }

  updateMultiList(payload: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/uniapprovelistupdate_es.php`,
      payload
    );
  }
}
