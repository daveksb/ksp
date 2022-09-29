import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EthicsService {
  constructor(private http: HttpClient) {}

  createEthics(payload: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/e-service/es-ethicsinsert`, payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }

  updateEthicsInvestigation(payload: any): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl}/e-service/es-ethicsupdate-investigation`,
        payload
      )
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }
}
