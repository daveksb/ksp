import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { environment } from '@ksp/shared/environment';

@Injectable({
  providedIn: 'root',
})
export class StaffPersonInfoService {
  constructor(private http: HttpClient) {}

  addStaff2(payload: any, tokenkey: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kspstaff/schstaff2insert`, {
      ...payload,
      tokenkey,
    });
  }

  /*   getStaff2(payload: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kspstaff/schstaff2select`, {
      ...payload,
      tokenkey: environment.token,
    });
  }
 */
  searchStaffFromIdCard(payload: any, tokenkey: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/schstaff2selectidcardno`,
      {
        ...payload,
        tokenkey,
      }
    );
  }

  addStaff(payload: any, tokenkey: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspschoolregister/schregisterinsert`,
      {
        ...payload,
        tokenkey,
      }
    );
  }

  updateStaff(payload: any, tokenkey: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspschoolregister/schstaffupdate`,
      {
        ...payload,
        tokenkey,
      }
    );
  }

  getStaffUserInfo(staffId: number, tokenkey: any): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/kspschoolregister/schstaffsearchid?id=${staffId}&tokenkey=${tokenkey}}`
    );
  }

  getStaffEdu(staffId: number, tokenkey: any): Observable<any> {
    return this.http
      .get(
        `${environment.apiUrl}/kspschoolregister/schstaffsearcheduid?id=${staffId}&tokenkey=${tokenkey}`
      )
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
