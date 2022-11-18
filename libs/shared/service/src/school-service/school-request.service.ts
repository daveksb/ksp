import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import {
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

  getTempLicense(requestid: string): Observable<SchTempLicense> {
    return this.http.post<SchTempLicense>(`${environment.apiUrl}/xxxxxx`, {
      requestid,
    });
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

  schCancelRequest(payload: KspRequestProcess): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/ksprequestinsertstatus`,
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
