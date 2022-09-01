import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { environment } from '@ksp/shared/environment';

@Injectable({
  providedIn: 'root',
})
export class StaffPersonInfoService {
  constructor(private http: HttpClient) {}

  addStaff(payload: any): Observable<any> {
    /* const header = new HttpHeaders().set(
      'Authorization',
      `Bearer frrrjbtswWVuiFxOlK4aHOK6AvcDlK6bBfCnQEHvanYkhuWAWQS6WQx6n4uVmZTxCYi4JEJ9ysLo2h6WLvjHaeHpAx2C3bt3LGjq`
    );
    const headers = { headers: header }; */
    return this.http.post(
      `${environment.apiUrl}/kspschoolregister/schregisterinsert`,
      {
        ...payload,
        tokenkey: environment.token,
      }
    );
  }

  getCountry(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/kspmasterdata/country`).pipe(
      map((data: any) => data.datareturn),
      shareReplay()
    );
  }

  getPrefix(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/kspmasterdata/nameprefix`).pipe(
      map((data: any) => data.datareturn),
      shareReplay()
    );
  }

  getProvinces(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/kspmasterdata/province`).pipe(
      map((data: any) => data.datareturn),
      shareReplay()
    );
  }

  getAmphurs(pid: number): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/amphur?provinceId=${pid}`)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }

  getTumbols(aid: number): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/tambol?amphurCode=${aid}`)
      .pipe(map((data: any) => data.datareturn));
  }

  getStaffTypes(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/schoolstafftype`)
      .pipe(map((data: any) => data.datareturn));
  }

  getPositionTypes(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/schoolpositiontype`)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }

  getAcademicStandingTypes(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/schoolacademicstandingtype`)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }
}
