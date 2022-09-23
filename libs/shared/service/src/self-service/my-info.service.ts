import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { map, Observable, shareReplay } from 'rxjs';
import { getCookie } from '@ksp/shared/utility';

@Injectable({
  providedIn: 'root',
})
export class MyInfoService {
  constructor(private http: HttpClient) {}

  getMyInfo(): Observable<any> {
    const id = getCookie('userId');
    return this.http
      .post(`${environment.apiUrl}/kspself/selfmyinfoselectbyidall`, {
        id,
      })
      .pipe(
        map((data: any) => data.datareturn?.[0] || {}),
        shareReplay()
      );
  }

  insertMyInfo(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspself/selfmyinfoinsert`,
      payload
    );
  }
}
