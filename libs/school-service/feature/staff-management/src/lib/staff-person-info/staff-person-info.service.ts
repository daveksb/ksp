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
}
