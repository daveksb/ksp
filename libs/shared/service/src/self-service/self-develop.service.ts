import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelfDevelopmentService {
  constructor(private http: HttpClient) {}

  createSelfDevelop(payload: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/kspself/schselfdevelopinsert`, payload)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }
}
