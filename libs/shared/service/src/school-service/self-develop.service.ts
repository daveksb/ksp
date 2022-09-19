import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelfDevelopService {
  constructor(private http: HttpClient) {}

  addSelfDevelopy(payload: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/kspstaff/schselfdevelopinsert`, payload)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }
}
