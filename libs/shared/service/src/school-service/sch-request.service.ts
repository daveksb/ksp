import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { SchoolRequest } from '@ksp/shared/interface';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SchRequestService {
  constructor(private http: HttpClient) {}

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

  changeRequestProcess(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/schrequestupdatecurrentprocess`,
      payload
    );
  }

  changeRequestStatus(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/schrequestupdaterequeststatus`,
      payload
    );
  }

  searchRequest(payload: any): Observable<SchoolRequest[]> {
    return this.http
      .post<SchoolRequest[]>(
        `${environment.apiUrl}/kspstaff/searchschrequest`,
        payload
      )
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
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
