import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UniserviceImportType } from '@ksp/shared/interface';
import {
  OriginalDegreeDialogComponent,
  StudentListSubjectComponent,
  TrainingAddressComponent,
  ViewHistoryAdmissionComponent
} from '@ksp/uni-service/dialog';
import { FormAddressTableComponent } from '@ksp/shared/form/others';
import {
  GeneralInfoService,
  UniInfoService,
  UniRequestService,
} from '@ksp/shared/service';
import localForage from 'localforage';
import {
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  getCookie,
  idCardPattern,
  nameEnPattern,
  nameThPattern,
  phonePattern,
  validatorMessages,
} from '@ksp/shared/utility';
import moment from 'moment';
import { studentStatusList } from 'libs/shared/constant/src/uni-service-constant';

@Component({
  selector: 'uni-service-data-student',
  templateUrl: './data-student.component.html',
  styleUrls: ['./data-student.component.scss'],
})
export class DataStudentComponent implements OnInit {
  users: any = [];
  ThPrefixes: Array<any> = [];
  EngPrefixes: Array<any> = [];
  nationality: Array<any> = [];
  isGraduated = false;
  pageType = 'admissionList';
  importType = UniserviceImportType;
  foundUser = false;
  courseData: any;
  payload: any;
  exceltoJson: any;
  headerStudent = {
    h1: 'ยื่นแบบคำขอ',
    h2: 'ขอยื่นรายชื่อผู้เข้าศึกษาและผู้สำเร็จการศึกษา',
    h3: 'ขอยื่นรายชื่อผู้เข้าศึกษา',
  };
  headerGraduate = {
    h1: 'ยื่นแบบคำขอ',
    h2: 'ขอยื่นรายชื่อผู้เข้าศึกษาและผู้สำเร็จการศึกษา',
    h3: 'ขอยื่นรายชื่อผู้สำเร็จการศึกษา',
  };
  requestNo = '';
  userBackup: any;
  requestDate: any = undefined;
  formStudent = this.fb.group({
    user: this.fb.array([]),
  });
  filterColumn = ['idcardno'];
  showHistoryButton = false;
  datasourceHistory = [];
  studentStatusList = studentStatusList;
  submitted = false;
  validatorMessages = validatorMessages;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private generalInfoService: GeneralInfoService,
    private fb: FormBuilder,
    private requestService: UniRequestService,
    private uniInfoService: UniInfoService
  ) {}

  ngOnInit() {
    localForage.getItem('userlist').then((res: any) => {
      if (res) {
        this.users = res;
      }
    });
    this.route.paramMap.subscribe((res) => {
      this.pageType = res.get('type') || 'admissionList';
    });
    const userId = Number(getCookie('userId'));
    localForage.getItem('courseData').then((res: any) => {
      if (res) {
        this.courseData = res;
        this.payload = {
          id: null,
          requestprocess: '1',
          requeststatus: '1',
          process: '1',
          status: '1',
          requesttype: this.pageType == 'admissionList' ? '05' : '06',
          uniuserid: userId,
          systemtype: '3',
          subtype: '5',
          unirequestdegreecertid: this.courseData.courseDetail.requestid || null,
          unidegreecertid: this.courseData.courseDetail.id || null,
          degreeapprovecode: this.courseData.courseDetail.degreeapprovecode || null,
          planyear: this.courseData.courseSelected.indexyear || null,
          plancalendaryear: this.courseData.courseSelected.calendaryear || null,
          planname: this.courseData.courseSelected.label || null,
          plantotalno: this.courseData.courseSelected.student || null,
          currentadmissionno: 0,
          currentgraduateno: 0,
          ref1: '3',
          ref2: this.pageType == 'admissionList' ? '05' : '06',
          ref3: '5',
          admissionlist: [],
          graduatelist: [],
        };
        if (this.pageType == 'admissionList') {
          this.getAdmissionList();
        } else {
          this.getGraduateList();
        }
      }
    });
    this.getNationality();
    this.getPrefix();
  }

  getAdmissionList() {
    this.requestService
      .getGraduateListById({
        unidegreecertid: this.courseData?.courseDetail.id,
        planyear: this.payload.planyear,
        plancalendaryear: this.payload.plancalendaryear,
        offset: 0,
        row: 999,
      })
      .subscribe((response: any) => {
        if (response.datareturn) {
          response.datareturn.forEach((user: any, index: any) => {
            user.index = index;
            user.subjects = JSON.parse(user.subjects);
            user.originaldegree = JSON.parse(user.originaldegree);
            this.user.push(this.edituser(user));
          });
          this.requestNo = response.datareturn.requestno;
          this.requestDate = response.datareturn.requestdate;
          this.payload.id = response.datareturn.id;
        }
      });
  }

  getGraduateList() {
    this.requestService
      .getGraduatedListById({
        unidegreecertid: this.courseData?.courseDetail.id,
        planyear: this.payload.planyear,
        plancalendaryear: this.payload.plancalendaryear,
        offset: 0,
        row: 999,
      })
      .subscribe((response: any) => {
        if (response.datareturn) {
          response.datareturn.forEach((user: any, index: any) => {
            user.index = index;
            user.teachingpracticeschool = [];
            user.admissiondate = moment(user.admissiondate).format(
              'YYYY-MM-DD'
            );
            user.birthdate = moment(user.birthdate).format('YYYY-MM-DD');
            user.subjects = JSON.parse(user.subjects);
            user.originaldegree = JSON.parse(user.originaldegree);
            this.user.push(this.edituser(user));
          });
          this.userBackup = [...this.user.value];
        }
      });
  }

  getNationality() {
    this.generalInfoService.getNationality().subscribe((response) => {
      if (response) {
        this.nationality = response;
      }
    });
  }

  getPrefix() {
    this.generalInfoService.getPrefix().subscribe((response) => {
      if (response) {
        this.ThPrefixes = response;
        this.EngPrefixes = response;
      }
    });
  }

  cancel() {
    this.router.navigate(['/degree-cert-list']);
  }

  get user(): FormArray {
    return this.formStudent.get('user') as FormArray;
  }

  edituser(data: any) {
    const {addressInfo} = JSON.parse(data.addressinfo);
    return this.fb.group({
      id: [data.id],
      checked: [data.checked ? data.checked : false],
      locked: [true],
      index: [data.index],
      no: [data.index + 1],
      admissiondate: [moment(data.admissiondate).format('YYYY-MM-DD')],
      idcardno: [
        data.idcardno,
        this.pageType == 'admissionList'
          ? [Validators.required, Validators.pattern(idCardPattern)]
          : undefined,
      ],
      passportno: [data.passportno],
      nationality: [
        data.nationality,
        this.pageType == 'admissionList' ? Validators.required : undefined,
      ],
      studentno: [
        data.studentno,
        this.pageType == 'admissionList' ? Validators.required : undefined,
      ],
      studentstatus: [
        data.studentstatus,
        this.pageType == 'admissionList' ? Validators.required : undefined,
      ],
      originaldegree: [
        data.originaldegree,
        this.pageType == 'admissionList' ? Validators.required : undefined,
      ],
      email: [
        data.email,
        this.pageType == 'admissionList' ? Validators.required : undefined,
      ],
      prefixth: [
        data.prefixth,
        this.pageType == 'admissionList' ? Validators.required : undefined,
      ],
      firstnameth: [
        data.firstnameth,
        this.pageType == 'admissionList'
          ? [Validators.required, Validators.pattern(nameThPattern)]
          : undefined,
      ],
      lastnameth: [
        data.lastnameth,
        this.pageType == 'admissionList'
          ? [Validators.required, Validators.pattern(nameThPattern)]
          : undefined,
      ],
      prefixen: [
        data.prefixen,
        this.pageType == 'admissionList' ? Validators.required : undefined,
      ],
      firstnameen: [
        data.firstnameen,
        this.pageType == 'admissionList'
          ? [Validators.required, Validators.pattern(nameEnPattern)]
          : undefined,
      ],
      middlenameen: [
        data.middlenameen,
        this.pageType == 'admissionList'
          ? [Validators.pattern(nameEnPattern)]
          : undefined,
      ],
      lastnameen: [
        data.lastnameen,
        this.pageType == 'admissionList'
          ? [Validators.required, Validators.pattern(nameEnPattern)]
          : undefined,
      ],
      phone: [
        data.phone,
        this.pageType == 'admissionList'
          ? [Validators.required, Validators.pattern(phonePattern)]
          : undefined,
      ],
      birthdate: [
        data.birthdate,
        this.pageType == 'admissionList' ? Validators.required : undefined,
      ],
      address: addressInfo ? this.fb.group({
        addressInfo: [
          {
            location: addressInfo?.location || null,
            housenumber: addressInfo?.housenumber || null,
            villagenumber: addressInfo?.villagenumber || null,
            lane: addressInfo?.lane || null,
            road: addressInfo?.road || null,
            zipcode: addressInfo?.zipcode || null,
            provinceid: addressInfo?.provinceid || null,
            districtid: addressInfo?.districtid || null,
            subdistrictid: addressInfo?.subdistrictid || null,
            remark: addressInfo?.remark || null,
          },
        ],
      }) : this.fb.group({ addressInfo: [] }),
      approveno: [
        data.approveno,
        this.pageType == 'graduateList' ? Validators.required : undefined,
      ],
      graduationdate: [
        data.graduationdate,
        this.pageType == 'graduateList' ? Validators.required : undefined,
      ],
      approvedate: [
        data.approvedate,
        this.pageType == 'graduateList' ? Validators.required : undefined,
      ],
      subjects: data.subjects
        ? [
            {
              subject1: data.subjects.subject1,
              subject2: data.subjects.subject2,
            },
            Validators.required,
          ]
        : [
            { subject1: '', subject2: '' },
            this.pageType == 'admissionList' ? Validators.required : undefined,
          ],
      teachingpracticeschool: [data.teachingpracticeschool],
    });
  }

  insertSubject(subjectInfo: any, index: any, disable: boolean) {
    const dialogRef = this.dialog.open(StudentListSubjectComponent, {
      width: '600px',
      data: {
        ...subjectInfo,
        disableAll: disable ?? false
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.user.at(index).patchValue({
          subjects: res,
        });
      }
    });
  }

  viewOriginalDegree(originalDegreeInfo: any, index: any, disable: boolean) {
    const dialogRef = this.dialog.open(OriginalDegreeDialogComponent, {
      width: '600px',
      data: {
        ...originalDegreeInfo,
        disableAll: disable ?? false
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.user.at(index).patchValue({
          originaldegree: res,
        });
      }
    });
  }

  searchAddress(index: any, disable: boolean) {
    const dialogRef = this.dialog.open(TrainingAddressComponent, {
      height: '100vh',
      width: '75vw',
      position: {
        top: '0px',
        right: '0px',
      },
      data: {
        teachingpracticeschool:
          this.user.at(index).value.teachingpracticeschool,
        disableAll: disable ?? false,
      },
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response) {
        this.user.at(index).patchValue({
          teachingpracticeschool: response,
        });
      }
    });
  }

  viewAdress(address: any) {
    this.dialog.open(FormAddressTableComponent, {
      width: '75vw',
      height: '100vw',
      position: {
        top: '0px',
        right: '0px',
      },
      data: {
        mode: 'view',
        address: address.addressInfo || {},
        isDialog: true,
      },
    });
  }

  prev() {
    this.router.navigate([
      '/',
      'student-list',
      'course-detail',
      this.payload.unidegreecertid,
    ]);
  }

  autoScroll() {
    setTimeout(() => {
      const doc = document.getElementById('address-info');
      if (doc != null) {
        doc.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
      }   
    }, 0);
  }

  viewRequestHistory() {
    this.dialog.open(ViewHistoryAdmissionComponent, {
      width: '80vw',
      height: '100vw',
      position: {
        top: '0px',
      },
      data: {
        pageType: this.pageType,
        datasource: this.datasourceHistory,
        nationality: this.nationality,
        ThPrefixes: this.ThPrefixes,
        EngPrefixes: this.EngPrefixes
      },
    });
  }
}
