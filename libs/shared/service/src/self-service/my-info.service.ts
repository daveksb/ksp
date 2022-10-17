import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { EMPTY, map, Observable, shareReplay } from 'rxjs';
import { getCookie } from '@ksp/shared/utility';
import { SelfMyInfo, SelfMyInfoKey } from '@ksp/shared/interface';

@Injectable({
  providedIn: 'root',
})
export class MyInfoService {
  constructor(private http: HttpClient) {}

  getMyInfo(): Observable<SelfMyInfo> {
    const id = getCookie('userId');
    if (id) {
      return this.http
        .post(`${environment.apiUrl}/kspself/selfmyinfoselectbyidall`, {
          id,
        })
        .pipe(
          map((data: any) => data.datareturn?.[0] || {}),
          shareReplay()
        );
    }
    return EMPTY;
  }

  insertMyInfo(payload: SelfMyInfo): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspself/selfmyinfoinsert`,
      payload
    );
  }

  updateMyInfo(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspself/selfmyinfoupdate`,
      payload
    );
  }

  resetPassword(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspself/selfmyinfoupdatepass`,
      payload
    );
  }

  formatMyInfo(info: SelfMyInfo) {
    const dateColumn = [
      'lastlogintime',
      'lastlogouttime',
      'createdate',
      'updatedate',
      'passportenddate',
      'visaenddate',
      'passportstartdate',
      'birthdate',
    ];
    const jsonColumn = [
      'addressinfo',
      'approveinfo',
      'eduinfo',
      'competencyinfo',
      'experienceinfo',
      'licenseinfo',
      'paymenthistory',
      'requestinfo',
      'schooladdrinfo',
      'selfdevelopmentinfo',
    ];
    for (const key in info) {
      const selfMyInfoKey = key as SelfMyInfoKey;
      if (dateColumn.includes(key)) {
        if (info[selfMyInfoKey]) {
          info[selfMyInfoKey] = info[selfMyInfoKey]?.split('T')[0] || null;
        }
      }
      if (jsonColumn.includes(key)) {
        if (info[selfMyInfoKey]) {
          info[selfMyInfoKey] = atob(info[selfMyInfoKey] as string) || null;
        }
      }
    }
    return info;
  }
}
