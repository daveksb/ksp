import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffTeachingInfoService {
  constructor(private http: HttpClient) {}

  getTeachingInfo(staffId: number, tokenkey: any): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/kspschoolregister/schstaffteachinginfoselectid?staffId=${staffId}&tokenkey=${tokenkey}`
    );
    //.pipe(map((data: any) => data.datareturn));
  }

  getHiringInfo(staffId: number, tokenkey: any): Observable<any> {
    return this.http.get(
      `${environment.apiUrl}/kspschoolregister/schstaffhiringinfoselectid?staffId=${staffId}&tokenkey=${tokenkey}`
    );
  }

  addTeachingInfo(payload: any, tokenkey: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspschoolregister/schstaffteachinginfoinsert`,
      {
        ...payload,
        tokenkey,
      }
    );
  }

  updateTeachingInfo(payload: any, tokenkey: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspschoolregister/schstaffteachinginfoupdate`,
      {
        ...payload,
        tokenkey,
      }
    );
  }

  addHiringInfo(payload: any, tokenkey: any): Observable<any> {
    return this.http.post(
      //https://kspapi.oceanicnetwork.net/ksp/kspschoolregister/schstaffteachinginsertupdate
      `${environment.apiUrl}/kspschoolregister/schstaffhiringinfoinsertupdate`,
      {
        ...payload,
        tokenkey,
      }
    );
  }
}
