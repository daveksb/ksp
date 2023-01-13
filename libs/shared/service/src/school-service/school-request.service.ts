import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import {
  KspListResponse,
  KspRequest,
  KspRequestProcess,
  SchRequestSearchFilter,
  SchTempLicense,
} from '@ksp/shared/interface';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchoolRequestService {
  constructor(private http: HttpClient) {}

  getTempLicense(requestid: string | null): Observable<SchTempLicense> {
    return this.http.post<SchTempLicense>(
      `${environment.apiUrl}/kspstaff/schtemplicenseselectrequestid`,
      {
        requestid,
      }
    );
  }

  getTempLicenseHistory(
    idcardno: string | null
  ): Observable<KspListResponse<SchTempLicense>> {
    return this.http.post<KspListResponse<SchTempLicense>>(
      `${environment.apiUrl}/kspstaff/schtemplicenseselectidcardno`,
      {
        idcardno,
      }
    );
  }

  schCreateRequest(payload: Partial<KspRequest>): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/ksprequestinsert`,
      payload
    );
  }

  schGetRequestById(id: number): Observable<KspRequest> {
    const payload = {
      id: `${id}`,
    };
    return this.http.post<KspRequest>(
      `${environment.apiUrl}/kspstaff/ksprequestselectbyid`,
      payload
    );
  }

  schUpdateRequest(payload: KspRequest): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/ksprequestupdate`,
      payload
    );
  }

  schUpdateRequestProcess(payload: KspRequestProcess): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/ksprequestinsertstatus`,
      payload
    );
  }

  schCloseRequest(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/ksprequestupdateisclose`,
      payload
    );
  }

  schSearchRequest(payload: SchRequestSearchFilter): Observable<KspRequest[]> {
    return this.http
      .post<KspRequest[]>(
        `${environment.shortApiUrl}/ksprequestsearch_school.php`,
        payload
      )
      .pipe(map((data: any) => data.datareturn));
  }

  loadFile(payload: any) {
    return this.http
      .post(`${environment.apiUrl}/kspstaff/schrequestfileselectbyid`, payload)
      .pipe(shareReplay());
  }
}
