import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffTeachingInfoService {
  constructor(private http: HttpClient) {}

  getTeachingInfo(staffId: number): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/kspschoolregister/schstaffteachinginfoselectid?staffId=${staffId}`
    );
  }

  getHiringInfo(staffId: number): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/kspschoolregister/schstaffhiringinfoselectid?staffId=${staffId}`
    );
  }

  addTeachingInfo(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspschoolregister/schstaffteachinginfoinsert`,
      payload
    );
  }

  updateTeachingInfo(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspschoolregister/schstaffteachinginfoupdate`,
      payload
    );
  }

  addHiringInfo(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspschoolregister/schstaffhiringinfoinsertupdate`,
      payload
    );
  }
}
