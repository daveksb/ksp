import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import {
  KspRequest,
  SchoolRequest,
  SchRequestSearchFilter,
} from '@ksp/shared/interface';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  // new table
  schCreateRequest(payload: Partial<KspRequest>): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/ksprequestinsert`,
      payload
    );
  }

  // new table
  schGetRequestById(id: number): Observable<KspRequest> {
    const payload = {
      id: `${id}`,
    };
    return this.http.post<KspRequest>(
      `${environment.apiUrl}/kspstaff/ksprequestselectbyid`,
      payload
    );
  }

  // new table
  schUpdateRequest(payload: KspRequest): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/ksprequestupdate`,
      payload
    );
  }

  // new table
  schCancelRequest(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/ksprequestinsertstatus`,
      payload
    );
  }

  // new table
  schSearchRequest(payload: SchRequestSearchFilter): Observable<KspRequest[]> {
    return this.http
      .post<KspRequest[]>(
        `${environment.shortApiUrl}/ksprequestsearch_school.php`,
        payload
      )
      .pipe(map((data: any) => data.datareturn));
  }

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

  cancelRequest(form: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/schrequestupdaterequeststatus`,
      form
    );
  }

  searchRequest(payload: any): Observable<SchoolRequest[]> {
    return this.http
      .post<SchoolRequest[]>(
        `${environment.shortApiUrl}/schrequestsearch.php`,
        payload
      )
      .pipe(map((data: any) => data.datareturn));
  }

  getRequestById(id: number): Observable<SchoolRequest> {
    return this.http.post<SchoolRequest>(
      `${environment.apiUrl}/kspstaff/schrequestselectidall`,
      {
        id: `${id}`,
      }
    );
  }

  loadFile(payload: any) {
    return this.http
      .post(`${environment.apiUrl}/kspstaff/schrequestfileselectbyid`, payload)
      .pipe(shareReplay());
  }
}
