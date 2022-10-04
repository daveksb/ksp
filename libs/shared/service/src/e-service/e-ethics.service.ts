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
    return this.http.post(
      `${environment.apiUrl}/e-service/es-ethicsinsert`,
      payload
    );
  }
  updateEthicsAccusation(payload: any): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl}/e-service/es-ethicsupdate-accusation`,
        payload
      )
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
  searchSelfMyInfo(payload: any): Observable<any> {
    return this.http
      .post('https://kspapi.oceanicnetwork.net/selfmyinfosearch.php', payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }
  searchSelfLicense(payload: any): Observable<any> {
    return this.http
      .post(
        `${environment.apiUrl}/e-service/selflicensesearchidcardno`,
        payload
      )
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }
  searchEthicssearch(payload: any): Observable<any> {
    return this.http
      .post('https://kspapi.oceanicnetwork.net/es_ethicssearch.php', payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }
  updateEthicsInquiry(payload: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/e-service/es-ethicsupdate-inquiry`, payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }
  updateEthicsResult(payload: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/e-service/es-ethicsupdate-result`, payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }
  updateEthicsPublish(payload: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/e-service/es-ethicsupdate-publish`, payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }
}
