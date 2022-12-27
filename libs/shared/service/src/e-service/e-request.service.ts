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
  SelfApproveList,
  SelfApproveGroup,
  SchTempLicense,
  SelfLicense,
} from '@ksp/shared/interface';
import { getCookie } from '@ksp/shared/utility';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ERequestService {
  constructor(private http: HttpClient) {}

  KspSearchRequest(payload: EsSearchPayload): Observable<KspRequest[]> {
    return this.http
      .post(`${environment.shortApiUrl}/ksprequestsearch_es.php`, payload)
      .pipe(map((data: any) => data.datareturn));
  }

  KspUpdateRequestProcess(payload: KspApprovePayload): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/ksprequestprocessinsert`,
      payload
    );
  }

  getKspRequestById(id: number): Observable<KspRequest> {
    return this.http.post<KspRequest>(
      `${environment.apiUrl}/e-service/ksprequestselectbyid`,
      {
        id,
      }
    );
  }

  getLicenseNoTh(): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/e-service/genrunningtemplicensenumberth`,
      { headers: { 'Cache-Control': 'no-store' } }
    );
  }

  getLicenseNoEn(): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/e-service/genrunningtemplicensenumberen`
    );
  }

  updateLicense(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/selflicenseupdate`,
      payload
    );
  }

  createTempLicense(payload: SchTempLicense): Observable<any> {
    return this.http.post<KspRequest>(
      `${environment.apiUrl}/e-service/schtemplicenseinsert`,
      payload
    );
  }

  getSelfLicense(requestid: string): Observable<SelfLicense> {
    return this.http.post<SelfLicense>(
      `${environment.apiUrl}/e-service/selflicenseselectbyrequestno`,
      {
        requestno: requestid,
      }
    );
  }

  getSelfApproveGroupById(groupno: string): Observable<SelfApproveGroup> {
    return this.http.post<SelfApproveGroup>(
      `${environment.apiUrl}/e-service/selfapprovegroupsearchgroupno`,
      {
        groupno,
      }
    );
  }

  searchSelfApproveList(payload: any): Observable<SelfApproveList[]> {
    return this.http
      .post(`${environment.shortApiUrl}/selfapprovelistsearch.php`, payload)
      .pipe(map((data: any) => data.datareturn));
  }

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
      `${environment.apiUrl}/e-service/schkuruspanoinsert`,
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

  createAprroveList(payload: Partial<SelfApproveList>): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/selfapprovelistinsert.php`,
      payload
    );
  }

  createAprroveGroup(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/e-service/selfapprovegroupinsert`,
      payload
    );
  }

  // ค้นหาใบคำขอที่มี สถานะตรวจเอกสารลำดับที่ 2
  getLevel2LicenseList(payload: any): Observable<KspListResponse<KspRequest>> {
    return this.http.post<KspListResponse<KspRequest>>(
      `${environment.shortApiUrl}/ksprequestsearch_listno_isnull_es.php`,
      payload
    );
  }

  getGroupByAccount(account: string): Observable<SelfApproveGroup> {
    return this.http.post<SelfApproveGroup>(
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

  updateSelfApproveListMati1(payload: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/uniapprovelistupdate_considerdate_es.php`,
      payload
    );
  }

  updateSelfApproveListMati2(payload: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/uniapprovelistupdate_approvedate_es.php`,
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

  getRequestListByGroupNo(
    payload: any
  ): Observable<KspListResponse<KspRequest>> {
    return this.http.post<KspListResponse<KspRequest>>(
      `${environment.shortApiUrl}/ksprequestsearcharray_e-self_groupno.php`,
      payload
    );
  }

  getRequestListByListNo(payload: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/ksprequestsearcharray_e-self.php`,
      payload
    );
  }

  createMultipleLicense(
    payload: any
  ): Observable<KspListResponse<SelfLicense>> {
    return this.http.post<KspListResponse<SelfLicense>>(
      `${environment.shortApiUrl}/selflicenseinsertarray.php`,
      payload
    );
  }

  updateMultipleLicenseStatus(payload: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/ksprequestprocessinsert.php`,
      payload
    );
  }

  setUrgentRequest(
    requestId: string | null,
    isurgent: boolean
  ): Observable<any> {
    const payload = {
      id: requestId,
      isurgent: isurgent ? '1' : '0',
    };
    return this.http.post(
      `${environment.apiUrl}/e-service/ksprequestupdateisurgent`,
      payload
    );
  }

  updateRequestClosed(
    requestId: number | null,
    isclose: string | null
  ): Observable<any> {
    const payload = {
      id: requestId,
      isclose: isclose ? '1' : '0',
    };
    return this.http.post(
      `${environment.apiUrl}/e-service/ksprequestupdateisclose`,
      payload
    );
  }
}
