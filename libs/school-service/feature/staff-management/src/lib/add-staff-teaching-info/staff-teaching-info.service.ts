import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffTeachingInfoService {
  constructor(private http: HttpClient) {}

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

  getTeachingInfo(staffId: number): Observable<any> {
    //https://kspapi.oceanicnetwork.net/ksp/kspschoolregister/schstaffteachinginfoselectid?staffId=3&tokenkey=
    return this.http.get(
      `${environment.apiUrl}/kspschoolregister/schstaffteachinginfoselectid?staffId=${staffId}&tokenkey=${environment.token}`
    );
    //.pipe(map((data: any) => data.datareturn));
  }
}
