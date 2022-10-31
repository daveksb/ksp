import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UniserviceImportType } from '@ksp/shared/interface';
import { EUniService, UniInfoService, UniRequestService } from '@ksp/shared/service';
import { getCookie, parseJson, thaiDate } from '@ksp/shared/utility';
import moment from 'moment';
import localForage from 'localforage';

@Component({
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  processType!: UniserviceImportType;
  importType = UniserviceImportType;
  requestDate = thaiDate(new Date());
  courseData: any = {};
  step1DegreeType = '';
  id: any;
  constructor(
    private router: Router, private route: ActivatedRoute,
    private uniRequestService: EUniService,
    private fb: FormBuilder,
    private uniInfoService: UniInfoService
  ) {}
  step1Form: any = this.fb.group({
    step1: [],
  });
  planRows = [1, 2, 3, 4];
  requestNo = '';
  headerDetail = [
    '',
    'ขอยื่นรายชื่อผู้เข้าศึกษา',
    'ขอยื่นรายชื่อผู้สำเร็จการศึกษา',
  ];
  planCount: any;

  async ngOnInit() {
    this.route.paramMap.subscribe((res) => {
      this.id = Number(res.get('id'));
      this.processType = 0;
    });
    this.uniRequestService.getUniDegreeCertById(this.id).subscribe(response=>{
      if (response.returncode != '99') {
        this.courseData = {...response};
        this.courseData.attachfiles = parseJson(response?.attachfiles);
        this.courseData.coordinatorinfo = parseJson(response?.coordinatorinfo);
        this.courseData.courseadvisor = parseJson(response?.courseadvisor);
        this.courseData.coursedetailinfo = parseJson(response?.coursedetailinfo);
        this.courseData.courseinstructor = parseJson(response?.courseinstructor);
        this.courseData.courseplan = parseJson(response?.courseplan);
        this.courseData.coursestructure = parseJson(response?.coursestructure);
        this.courseData.courseteacher = parseJson(response?.courseteacher);
        this.courseData.evaluatelocation = parseJson(response?.evaluatelocation);
        this.courseData.processteaching = parseJson(response?.processteaching);
        this.courseData.processtrainning = parseJson(response?.processtrainning);
        this.courseData.responsibleunit = parseJson(response?.responsibleunit);
        this.courseData.teachinglocation = parseJson(response?.teachinglocation);
        this.courseData.totalStudent = this.courseData.coursestructure.reduce((curr: any,prev: any)=>{
          return curr + parseInt(prev.student)
        }, 0);
        this.getAdmissionDetail(this.courseData);
        this._mappingResponseWithForm(response);
      }
    })
  }

  private _mappingResponseWithForm(res: any): any {
    this.requestNo = res?.requestno ?? '';
    this.step1Form.setValue({
      step1: {
        institutionsCode: res?.universitycode || '',
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
          courseApproveDate: this.toDate(res?.courseapprovedate),
          courseAcceptDate: this.toDate(res?.courseacceptdate),
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
      },
    });
  }

  getAdmissionDetail(data: any) {
    const payload = {
      unidegreecertid: data.id,
      plancalendaryear: '2562',
      row: 10,
      offset: 0
    }
    this.uniRequestService.getAdmissionCount(payload).subscribe((response: any) => {
      if (response.datareturn) {
        this.courseData.coursestructure.map((course: any, index: any)=>{
          course.indexyear = index;
          const findDataAdmission = response.datareturn.find((data: any) => {
            return data.plancalendaryear == course.year;
          });
          course.admissioncount = findDataAdmission ? (findDataAdmission.unidegreecertidcount || 0) : 0;
          const findDataGraduate = response.datareturngraduation.find((data: any) => {
            return data.plancalendaryear == course.year;
          });
          course.graduatecount = findDataGraduate ? (findDataGraduate.unidegreecertidcount || 0) : 0;
        })
      }
    })
  }

  private toDate(sDate: any) {
    return sDate ? moment(sDate).format('yyyy-MM-DD') : '';
  }

  goToImportStudent(type: string, row: any) {
    const rowDetail = {
      ...row,
      indexyear: row.indexyear,
      calendaryear: row.year,
      currentadmissionno: row.admissioncount || 0,
      currentgraduateno: row.graduatecount || 0
    }
    const course = {
      courseSelected: rowDetail,
      courseDetail: this.courseData
    };
    localForage.setItem('courseData', course);
    this.router.navigate(['/degree-cert', 'student-list', type]);
  }

  cancel() {
    this.router.navigate(['/', 'student-list']);
  }

  checkGraduate(row: any) {
    const yearnow = (new Date().getFullYear() + 543);
    return (Number(row.year)+2) <= yearnow 
          && row.graduatecount < row.student
          && row.student == row.admissioncount;
  }

  viewCourseDetail() {
    this.router.navigate(['/degree-cert', 'request'], {
      queryParams: {
        id: this.courseData.requestid,
      },
    });
  }
}
