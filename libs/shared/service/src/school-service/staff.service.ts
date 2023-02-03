import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { KspResponse, SchStaff } from '@ksp/shared/interface';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(private http: HttpClient) {}

  addStaff(payload: Partial<SchStaff>): Observable<KspResponse> {
    return this.http.post<KspResponse>(
      `${environment.apiUrl}/kspstaff/schstaff2insert`,
      payload
    );
  }

  updateStaff(payload: Partial<SchStaff>): Observable<KspResponse> {
    return this.http.post<KspResponse>(
      `${environment.apiUrl}/kspstaff/schstaff2update`,
      payload
    );
  }

  loadStaffFromId(staffId: number): Observable<SchStaff> {
    const payload = {
      id: `${staffId}`,
    };
    return this.http.post<SchStaff>(
      `${environment.apiUrl}/kspstaff/schstaff2select`,
      payload
    );
  }

  searchStaffFromIdCard(payload: any): Observable<SchStaff> {
    return this.http.post<SchStaff>(
      `${environment.apiUrl}/kspstaff/schstaff2selectidcardno`,
      payload
    );
  }

  searchStaffFromKuruspaNo(payload: any): Observable<any> {
    return this.http.post<SchStaff>(
      `${environment.apiUrl}/kspstaff/schstaff2search`,
      payload
    );
  }

  searchStaffs(payload: any): Observable<SchStaff[]> {
    return this.http
      .post(`${environment.shortApiUrl}/schstaff2search.php`, payload)
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
