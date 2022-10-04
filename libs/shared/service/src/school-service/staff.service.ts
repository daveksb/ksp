import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(private http: HttpClient) {}

  addStaff(payload: any): Observable<any> {
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

  searchStaffs(payload: any): Observable<any> {
    return this.http
      .post(`${environment.shortApiUrl}/schstaff2search.php`, {
        ...payload,
      })
      .pipe(map((data: any) => data.datareturn));
  }

  updateStaff(payload: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kspstaff/schstaff2update`, {
      ...payload,
    });
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
