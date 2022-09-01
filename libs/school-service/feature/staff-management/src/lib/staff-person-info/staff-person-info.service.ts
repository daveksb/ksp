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
