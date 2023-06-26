import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@ksp/shared/environment';
import { getCookie, parseJson } from '@ksp/shared/utility';
import { lastValueFrom, map, Observable, shareReplay } from 'rxjs';
import _ from 'lodash';
import moment from 'moment';
function toDate(sDate: any) {
  return sDate ? moment(sDate).format('yyyy-MM-DD') : '';
}
@Injectable({
  providedIn: 'root',
})
export class UniInfoService {
  constructor(private http: HttpClient) {}
  mappingUniverSitySelectByIdWithForm(res: any): any {
    const formData: any = {};
    formData.checkresult = parseJson(res.checkresult);
    formData.requestNo = res?.requestno ?? '';
    formData.step1 = {
      institutionsCode: res?.unicode || '',
      institutionsGroup: res?.unitype || '',
      institutionsName: res?.uniname || '',
      provience: res?.uniprovince || '',
      courseDetailType: res?.coursedetailtype,
      courseDetail: res?.coursedetailinfo
        ? parseJson(res?.coursedetailinfo)
        : null,
      degreeTypeForm: {
        degreeType: res?.degreelevel,
        courseYear: res?.courseacademicyear,
        courseName: res?.coursename,
        courseType: res?.coursetype,
        courseStatus: res?.coursestatus,
        degreeNameThFull: res?.fulldegreenameth,
        degreeNameThShort: res?.shortdegreenameth,
        degreeNameEnFull: res?.fulldegreenameen,
        degreeNameEnShort: res?.shortdegreenameen,
        courseApproveTime: res?.courseapprovetime,
        courseApproveDate: toDate(res?.courseapprovedate),
        courseAcceptDate: toDate(res?.courseacceptdate),
      },
      //type json
      locations: res?.teachinglocation
        ? parseJson(res?.teachinglocation)
        : null,
      institutions: res?.responsibleunit
        ? parseJson(res?.responsibleunit)
        : null,
      locations2: res?.evaluatelocation
        ? parseJson(res?.evaluatelocation)
        : null,
      coordinator: res?.coordinatorinfo
        ? parseJson(res?.coordinatorinfo)
        : null,
    };
    const parseCourseInstructor = res.courseinstructor ? parseJson(res.courseinstructor) : {};
    const parseCourseAdvisor = res.courseadvisor ? parseJson(res.courseadvisor) : [];
    const parseCourseTeacher = res.courseteacher ? parseJson(res.courseteacher) : [];
    formData.step2 = {
      teacher: {
        teachers: parseCourseTeacher,
      },
      nitet: {
        nitets: parseCourseInstructor.nitets,
        nittetAmount: parseCourseInstructor.nittetAmount
      },
      advisor: {
        advisors: parseCourseAdvisor,
      },
    };
    if (['1', '2', '3', '4'].includes(res?.degreelevel)) {
      formData.step2.plan1 = {
        plans: res.coursestructure ? parseJson(res.coursestructure) : [],
        subjects: res.courseplan ? parseJson(res.courseplan) : [],
      };
    } else {
      const subjectsdata = parseJson(res.courseplan);
      formData.step2.plan2 = {
        plans: res.coursestructure ? parseJson(res.coursestructure) : [],
        subjects: res.courseplan ? subjectsdata.subjects : [],
        subject1GroupName: subjectsdata.subjectgroupname ? subjectsdata?.subjectgroupname.subject1GroupName : '',
        subject2GroupName: subjectsdata.subjectgroupname ? subjectsdata?.subjectgroupname.subject2GroupName : '',
        subject3GroupName: subjectsdata.subjectgroupname ? subjectsdata?.subjectgroupname.subject3GroupName : '',
      };
    }
    formData.step3 = {
      training: {
        rows: res.processtrainning ? parseJson(res.processtrainning) : [],
      },
      teaching: {
        rows: res.processteaching ? parseJson(res.processteaching) : [],
      },
    };
    console.log(parseJson(res?.attachfiles))
    if (res?.attachfiles)
      formData.step4 = {
        files: parseJson(res?.attachfiles),
      };
    if (res?.degreeapprovecode) {
      formData.degreeApproveCode = res?.degreeapprovecode;
    }
    return formData;
  }
  univerSitySelectById(id: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/kspuni/universityselectbyid`, {
      id,
      tokenkey: getCookie('userToken'),
    });
  }
  searchTypeidUniUniversity(id: any): Observable<any> {
    return this.http
      .get(
        `${environment.apiUrl}/kspmasterdata/searchtypeiduniuniversity?searchtypeid=${id}`
      )
      .pipe(map((res: any) => res?.datareturn));
  }

  uniRequestDegreeSearch(params: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/unirequestdegreecertsearch.php`,
      {
        ...params,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  uniRequestDegreeCertSelectById(id: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspuni/unirequestdegreecertselectbyid`,
      { id, tokenkey: getCookie('userToken') }
    );
  }
  getUniversity(typeId: any): Observable<any> {
    return this.http
      .get(
        `${environment.apiUrl}/kspmasterdata/searchtypeiduniuniversity?searchtypeid=${typeId}`
      )
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }

  getUniversityType(): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/uniuniversitytype`)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }

  searchUniversity(body: any): Observable<any> {
    return this.http
      .post(`${environment.shortApiUrl}/uniuniversitysearch.php`, body)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }

  getOccupy() {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/unieduoccupy`)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }

  uniDegreeLevel() {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/unidegreelevel`)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }
  uniFieldOfStudy() {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/unifieldofstudy`)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }
  uniMajor(id?: string) {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/unimajor?fieldofstudyid=${id}`)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }

  uniSubject(id?: string) {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/unisubject?majorid=${id}`)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }

  uniAcademicYear() {
    return this.http
      .get(`${environment.apiUrl}/kspmasterdata/uniacademicyear`)
      .pipe(
        map((data: any) => data.datareturn),
        shareReplay()
      );
  }

  uniDegreeSearch(params: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/unidegreecertsearch.php`,
      {
        ...params,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  editUniDegreeSearch(params: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/unirequestdegreecertsearchedit.php`,
      {
        ...params,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  async getMajorAndBranch(row: any) {
    let major: any;
    let branch: any;
    if (row?.coursefieldofstudy)
      major = await lastValueFrom(
        this.uniMajor(row?.coursefieldofstudy).pipe(
          map((res) => {
            return _.find(res, { id: row?.coursemajor });
          })
        )
      );
    if (major?.id)
      branch = await lastValueFrom(
        this.uniSubject(major?.id).pipe(
          map((res) => {
            return _.find(res, { id: row?.coursesubjects });
          })
        )
      );
    return { major: major?.name || '-', branch: branch?.name || '-' };
  }

  uniDegreeCertSelectByid(id: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspuni/unidegreecertselectbyid`,
      {
        id,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  // searchSelfStudent(params: any): Observable<any> {
  //   return this.http.post(
  //     `${environment.shortApiUrl}/selfmyinfosearch_uni.php`,
  //     {
  //       ...params,
  //       tokenkey: getCookie('userToken'),
  //     }
  //   );
  // }

  searchSelfStudent(params: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('ksppublicapi:KspPublicApi@2023')
      })
    };
    return this.http.get(
      `${environment.zdklabs}/public/user?=identity_no=${params?.identity_no}`,
      httpOptions
    )
  }

  uniAdmissionSearch(params: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/unidegreeadmissionsearch.php`,
      {
        ...params,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  uniAdmissionSearch2(params: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/unidegreeadmissionsearch_2.php`,
      {
        ...params,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  uniRequestDegreeCertSelectUniDegreeCertId(
    unidegreecertid: any
  ): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspuni/unirequestdegreecertselectunidegreecertid`,
      {
        unidegreecertid,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  uniDegreeHistory(params: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspuni/unirequestadmissionselectadid`,
      {
        ...params,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  uniRequestEditHistory(params: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspuni/unirequestadmissionjoinksprequestprocessselect`,
      {
        ...params,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  kspRequestSearchUni(params: any): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/ksprequestsearch_uni.php`,
      {
        ...params,
        tokenkey: getCookie('userToken'),
      }
    );
  }
  getUniuniversity(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/kspmasterdata/uniuniversity`);
  }
  getUniDegreelevel(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/kspmasterdata/unidegreelevel`);
  }

  getBoard(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/kspmasterdata/board`);
  }

  getRequestProcessHistory(params: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/kspuni/ksprequestprocessselectbyrequestid_requestdegree`,
      {
        ...params,
        tokenkey: getCookie('userToken'),
      }
    );
  }

  getRejectedRequest(): Observable<any> {
    return this.http.post(
      `${environment.shortApiUrl}/unirequestadmissionsearch_requestedit.php`,
      {
        tokenkey: getCookie('userToken'),
      }
    );
  }
}
