import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StaffManagementService {
  constructor(private http: HttpClient) {}

  getStaffs(schoolId: string): Observable<any> {
    return this.http
      .get(
        `${environment.apiUrl}/kspschoolregister/schstaffall?schoolId=${schoolId}&tokenkey=${environment.token}`
      )
      .pipe(map((data: any) => data.datareturn));
  }
}
