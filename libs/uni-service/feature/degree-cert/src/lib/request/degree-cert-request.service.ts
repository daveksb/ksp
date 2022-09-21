import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { getCookie } from '@ksp/shared/utility';
import { Observable } from 'rxjs';
export type UniRequestInsertType = {
  requestprocess?: string;
  requeststatus?: string;
  systemtype?: string;
  requesttype?: string;
  subtype?: string;
  unitype?: string;
  uniname?: string;
  unicode?: string;
  uniprovince?: string;
  degreelevel?: string;
  courseacademicyear?: string;
  coursename?: string;
  coursetype?: string;
  coursestatus?: string;
  coursemajor?: string;
  coursefieldofstudy?: string;
  coursesubjects?: string;
  fulldegreenameth?: string;
  fulldegreenameen?: string;
  shortdegreenameth?: string;
  shortdegreenameen?: string;
  courseapprovetime?: string;
  courseapprovedate?: Date;
  courseacceptdate?: Date;
  coursedetailtype?: string;
  coursedetailinfo?: string;
  teachinglocation?: string;
  responsibleunit?: string;
  evaluatelocation?: string;
  coordinatorinfo?: string;
  coursestructure?: string;
  courseplan?: string;
  courseteacher?: string;
  courseinstructor?: string;
  courseadvisor?: string;
  processtrainning?: string;
  processteaching?: string;
  attachfiles?: string;
  checkresult?: string;
  considerresult?: string;
  approveresult?: string;
  degreeapprovecode?: string;
  uniid?: string;
  ref1?: string;
  ref2?: string;
  ref3?: string;
  tokenkey?: string;
};
@Injectable({
  providedIn: 'root',
})
export class DegreeCertRequestService {
  constructor(private http: HttpClient) {}
  universitySelectById(id: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kspuni/universityselectbyid`, {
      id,
      tokenkey: getCookie('userToken'),
    });
  }
  uniRequestInsert(params: UniRequestInsertType): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspuni/universityselectbyid`,
      params
    );
  }
}
