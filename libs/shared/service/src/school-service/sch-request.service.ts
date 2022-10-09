import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { KspRequest, SchoolRequest } from '@ksp/shared/interface';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  // new table
  schCreateRequest(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/ksprequestinsert`,
      payload
    );
  }

  // new table
  schGetRequestById(id: number): Observable<KspRequest> {
    return this.http.post<KspRequest>(
      `${environment.apiUrl}/kspstaff/ksprequestselectbyid`,
      {
        id: `${id}`,
      }
    );
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
