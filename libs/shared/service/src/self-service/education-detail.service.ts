import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EducationDetailService {
  constructor(private http: HttpClient) {}

  getBureau(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/kspmasterdata/bureau`).pipe(
      map((data: any) => data.datareturn),
      shareReplay()
    );
  }

  getLicenseType(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/schoollicensetype`)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }
}
