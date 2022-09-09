import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(private http: HttpClient) {}

  addStaff2(payload: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kspstaff/schstaff2insert`, {
      ...payload,
    });
  }

  searchStaffFromId(staffId: number): Observable<any> {
    const payload = {
      id: `${staffId}`,
    };
    return this.http.post(`${environment.apiUrl}/kspstaff/schstaff2select`, {
      ...payload,
    });
  }

  searchStaffFromIdCard(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspstaff/schstaff2selectidcardno`,
      {
        ...payload,
      }
    );
  }

  searchStaffsFromFilter(payload: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/kspstaff/schstaff2selectall`, {
        ...payload,
      })
      .pipe(map((data: any) => data.datareturn));
  }

  updateStaff2(payload: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kspstaff/schstaff2update`, {
      ...payload,
    });
  }

  getStaffUserInfo(staffId: number): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/kspschoolregister/schstaffsearchid?id=${staffId}}`
    );
  }

  getStaffEdu(staffId: number): Observable<any> {
    return this.http
      .get(
        `${environment.apiUrl}/kspschoolregister/schstaffsearcheduid?id=${staffId}`
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
