import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffPersonInfoService {
  private serviceUrl = 'http://38.242.138.3/ksp/kspmasterdata';

  constructor(private http: HttpClient) {}

  addStaff(): Observable<any> {
    return this.http.post(this.serviceUrl, {});
  }

  getPrefix(): Observable<any> {
    return this.http
      .get(`${this.serviceUrl}/nameprefix`)
      .pipe(map((data: any) => data.datareturn));
  }

  getProvinces(): Observable<any> {
    return this.http
      .get(`${this.serviceUrl}/province`)
      .pipe(map((data: any) => data.datareturn));
  }

  getAmphurs(pid: number): Observable<any> {
    return this.http
      .get(`${this.serviceUrl}/amphur?provinceId=${pid}`)
      .pipe(map((data: any) => data.datareturn));
  }

  getTumbols(aid: number): Observable<any> {
    return this.http
      .get(`${this.serviceUrl}/tambol?amphurCode=${aid}`)
      .pipe(map((data: any) => data.datareturn));
  }

  getStaffTypes(): Observable<any> {
    return this.http
      .get(`${this.serviceUrl}/schoolstafftype`)
      .pipe(map((data: any) => data.datareturn));
  }

  getPositionTypes(): Observable<any> {
    return this.http
      .get(`${this.serviceUrl}/schoolpositiontype`)
      .pipe(map((data: any) => data.datareturn));
  }

  getAcademicStandingTypes(): Observable<any> {
    return this.http
      .get(`${this.serviceUrl}/schoolacademicstandingtype`)
      .pipe(map((data: any) => data.datareturn));
  }
}
