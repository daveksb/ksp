import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffTeachingInfoService {
  constructor(private http: HttpClient) {}

  //https://kspapi.oceanicnetwork.net/ksp/kspschoolregister/schstaffteachinginfoupdate
  //https://kspapi.oceanicnetwork.net/ksp/kspschoolregister/schstaffteachinginfoinsert

  addTeachingInfo(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspschoolregister/schstaffteachinginfoinsert`,
      {
        ...payload,
        tokenkey: environment.token,
      }
    );
  }

  addHiringInfo(payload: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspschoolregister/schstaffhiringinfoinsert`,
      {
        ...payload,
        tokenkey: environment.token,
      }
    );
  }
}
