import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { SelfRequest } from '@ksp/shared/interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelfRequestService {
  constructor(private http: HttpClient) {}

  createRequest(form: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kspself/requestinsert`, form);
  }

  searchMyRequests(payload: any): Observable<SelfRequest[]> {
    return this.http
      .post<SelfRequest[]>(
        `${environment.apiUrl}/kspself/requestsearch`,
        payload
      )
      .pipe(map((data: any) => data.datareturn));
  }

  getRequestById(id: number): Observable<SelfRequest> {
    return this.http.post<SelfRequest>(
      `${environment.apiUrl}/kspself/requestselectidall`,
      {
        id: `${id}`,
      }
    );
  }
}
