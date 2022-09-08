import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffManagementService {
  constructor(private http: HttpClient) {}

  getStaffs(schoolId: string, tokenkey: any): Observable<any> {
    return this.http
      .get(
        `${environment.apiUrl}/kspschoolregister/schstaffall?schoolId=${schoolId}&tokenkey=${tokenkey}`
      )
      .pipe(map((data: any) => data.datareturn));
  }
}
