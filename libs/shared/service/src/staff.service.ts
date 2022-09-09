import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { environment } from '@ksp/shared/environment';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(private http: HttpClient) {}

  addStaff2(payload: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kspstaff/schstaff2insert`, {
      ...payload,
      tokenkey: environment.token,
    });
  }

  searchStaffFromId(staffId: number): Observable<any> {
    const payload = {
      id: `${staffId}`,
    };
    return this.http.post(`${environment.apiUrl}/kspstaff/schstaff2select`, {
      ...payload,
      tokenkey: environment.token,
    });
  }

  searchStaffFromIdCard(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/schstaff2selectidcardno`,
      {
        ...payload,
        tokenkey: environment.token,
      }
    );
  }

  searchStaffsFromFilter(payload: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/kspstaff/schstaff2selectall`, {
        ...payload,
        tokenkey: environment.token,
      })
      .pipe(map((data: any) => data.datareturn));
  }

  updateStaff2(payload: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kspstaff/schstaff2update`, {
      ...payload,
      tokenkey: environment.token,
    });
  }

  getStaffUserInfo(staffId: number): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/kspschoolregister/schstaffsearchid?id=${staffId}&tokenkey=${environment.token}}`
    );
  }

  getStaffEdu(staffId: number): Observable<any> {
    return this.http
      .get(
        `${environment.apiUrl}/kspschoolregister/schstaffsearcheduid?id=${staffId}&tokenkey=${environment.token}`
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
