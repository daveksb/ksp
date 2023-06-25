import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { Ethics, EthicsKey , KspAccusationRequest } from '@ksp/shared/interface';
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
      .post('https://kspapi.oceanicnetwork.net/kspx/ethic/selfmyinfosearch.php', payload)
      .pipe(
        shareReplay(),
        map((data: any) => data.datareturn)
      );
  }
  searchSelfLicense(payload: any): Observable<any> {
    return this.http
        .post( `https://kspapi.oceanicnetwork.net/kspx/ethic/selfmyinfosearch.php`, payload)
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
  getEthicsByID(payload: any): Observable<Ethics> {
    return this.http
      .post<Ethics>(
        `${environment.apiUrl}/e-service/es-ethicsselectbyid`,
        payload
      )
      .pipe(map((data) => this.formatMyInfo(data)));
  }
  formatMyInfo(info: Ethics): Ethics {
    const dateColumn = [
      'accusationincidentdate',
      'accusationissuedate',
      'accusationassigndate',
      'investigationorderdate',
      'investigationdate',
      'investigationreportdate',
      'inquiryorderdate',
      'inquiryexplaindate',
      'inquiryjbdate',
      'resultcomitteedate',
      'resulttoaccuserdate',
      'resulttoschooldate',
      'resulttoaccuseddate',
    ];
    const jsonColumn = [
      'accuserinfo',
      'accusationfile',
      'accusationconsideration',
      'investigationresult',
      'investigationsubcommittee',
      'inquiryresult',
      'inquirysubcommittee',
    ];
    for (const key in info) {
      const ethicsKey = key as EthicsKey;
      if (dateColumn.includes(key)) {
        if (info[ethicsKey]) {
          info[ethicsKey] = info[ethicsKey]?.split('T')[0] || null;
        }
      }
      if (jsonColumn.includes(key)) {
        if (info[ethicsKey]) {
          info[ethicsKey] = atob(info[ethicsKey] as string);
        }
      }
    }
    return info;
  }
}
