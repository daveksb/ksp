import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  getCountry(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/kspmasterdata/country`).pipe(
      map((data: any) => data.datareturn),
      shareReplay()
    );
  }

  getProvinces(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/kspmasterdata/province`).pipe(
      map((data: any) => data.datareturn),
      shareReplay()
    );
  }

  getAmphurs(pid: number): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/amphur?provinceId=${pid}`)
      .pipe(map((data: any) => data.datareturn));
  }

  getTumbols(aid: number): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/tambol?amphurCode=${aid}`)
      .pipe(map((data: any) => data?.datareturn));
  }

  getAddressByPostcode(postcode: string | null): Observable<any> {
    return this.http
      .post(`${environment.shortApiUrl}/postcodesearch.php`, { postcode: postcode, offset: 0, row: 10 })
      .pipe(map((data: any) => data?.datareturn));
  }
}
