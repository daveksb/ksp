import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffPersonInfoService {
  private serviceUrl = 'https://kspapi.oceanicnetwork.net/ksp';

  token =
    'abcdjbtswWVuiFxOlK4aHOK6AvcDlK6bBfCnQEHvanYkhuWAWQS6WQx6n4uVmZTxCYi4JEJ9ysLo2h6WLvjHaeHpAx2C3bt3LGjq';

  constructor(private http: HttpClient) {}

  addStaff(payload: any): Observable<any> {
    /* const header = new HttpHeaders().set(
      'Authorization',
      `Bearer frrrjbtswWVuiFxOlK4aHOK6AvcDlK6bBfCnQEHvanYkhuWAWQS6WQx6n4uVmZTxCYi4JEJ9ysLo2h6WLvjHaeHpAx2C3bt3LGjq`
    );
    const headers = { headers: header }; */
    return this.http.post(
      `${this.serviceUrl}/kspschoolregister/schregisterinsert`,
      {
        ...payload,
        tokenkey: this.token,
      }
    );
  }

  getCountry(): Observable<any> {
    return this.http.get(`${this.serviceUrl}/kspmasterdata/country`).pipe(
      map((data: any) => data.datareturn),
      shareReplay()
    );
  }

  getPrefix(): Observable<any> {
    return this.http.get(`${this.serviceUrl}/kspmasterdata/nameprefix`).pipe(
      map((data: any) => data.datareturn),
      shareReplay()
    );
  }

  getProvinces(): Observable<any> {
    return this.http.get(`${this.serviceUrl}/kspmasterdata/province`).pipe(
      map((data: any) => data.datareturn),
      shareReplay()
    );
  }

  getAmphurs(pid: number): Observable<any> {
    return this.http
      .get(`${this.serviceUrl}/kspmasterdata/amphur?provinceId=${pid}`)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }

  getTumbols(aid: number): Observable<any> {
    return this.http
      .get(`${this.serviceUrl}/kspmasterdata/tambol?amphurCode=${aid}`)
      .pipe(map((data: any) => data.datareturn));
  }

  getStaffTypes(): Observable<any> {
    return this.http
      .get(`${this.serviceUrl}/kspmasterdata/schoolstafftype`)
      .pipe(map((data: any) => data.datareturn));
  }

  getPositionTypes(): Observable<any> {
    return this.http
      .get(`${this.serviceUrl}/kspmasterdata/schoolpositiontype`)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }

  getAcademicStandingTypes(): Observable<any> {
    return this.http
      .get(`${this.serviceUrl}/kspmasterdata/schoolacademicstandingtype`)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }
}
