import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralInfoService {
  constructor(private http: HttpClient) {}

  getPrefix(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/kspmasterdata/nameprefix`).pipe(
      map((data: any) => data.datareturn),
      shareReplay()
    );
  }

  getVisaType(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/kspmasterdata/visatype`).pipe(
      map((data: any) => data.datareturn),
      shareReplay()
    );
  }

  getVisaClass(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/kspmasterdata/visaclass`).pipe(
      map((data: any) => data.datareturn),
      shareReplay()
    );
  }

  getNationality(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/nationality`)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }

  getBureau(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/kspmasterdata/bureau`).pipe(
      map((data: any) => data.datareturn),
      shareReplay()
    );
  }
}
