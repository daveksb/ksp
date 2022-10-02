import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UniserviceImportType } from '@ksp/shared/interface';
import { UniInfoService, UniRequestService } from '@ksp/shared/service';
import { parseJson, thaiDate } from '@ksp/shared/utility';
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
    private uniRequestService: UniRequestService,
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
      if (response) {
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
        }, 0)
        console.log(this.courseData);
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
    console.log(data)
    const payload = {
      unidegreecertid: '1',
      plancalendaryear: '2022',
      row: 10,
      offset: 0
    }
    this.uniRequestService.getAdmissionCount(payload).subscribe((response: any) => {
      if (response.datareturn) {
        console.log(response)
        this.courseData.coursestructure.map((course: any)=>{
          const findData = response.datareturn.find((data: any)=>{ return Number(data.planyear) == course.year})
          course.admissionCount = findData ? findData.unidegreecertidcount : 0;
        })
      }
    })
  }

  private toDate(sDate: any) {
    return sDate ? moment(sDate).format('yyyy-MM-DD') : '';
  }

  goToImportStudent(type: string, row: any) {
    console.log(type)
    const course = {
      courseSelected: row,
      courseDetail: this.courseData
    };
    localForage.setItem('courseData', course);
    this.router.navigate(['/', 'student-list', 'import-student', type]);
  }

  cancel() {
    this.router.navigate(['/', 'student-list']);
  }
}
