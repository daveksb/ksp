import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UniserviceImportType } from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
} from '@ksp/shared/dialog';
import {
  OriginalDegreeDialogComponent,
  StudentListSubjectComponent,
  TrainingAddressComponent,
} from '@ksp/uni-service/dialog';
import { UserService } from './user.service';
import { FormAddressTableComponent } from '@ksp/shared/form/others';
import {
  EUniService,
  GeneralInfoService,
  LoaderService,
  UniInfoService,
} from '@ksp/shared/service';
import localForage from 'localforage';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import {
  getCookie,
  idCardPattern,
  nameEnPattern,
  nameThPattern,
  parseJson,
  phonePattern,
} from '@ksp/shared/utility';
import moment from 'moment';
import { studentStatusList } from '@ksp/shared/constant';

@Component({
  selector: 'e-service-import-student',
  templateUrl: './import-student.component.html',
  styleUrls: ['./import-student.component.scss'],
})
export class ImportStudentComponent implements OnInit {
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
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  requestid = '';
  requeststatus = '1';
  studentStatusList = studentStatusList

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private generalInfoService: GeneralInfoService,
    private fb: FormBuilder,
    private requestService: EUniService,
    private uniInfoService: UniInfoService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    localForage.getItem('userlist').then((res: any) => {
      if (res) {
        this.users = res;
      }
    });
    this.route.paramMap.subscribe((res) => {
      this.requestid = res.get('requestid') || '';
    });
    this.getAdmissionList();
    this.getNationality();
    this.getPrefix();
  }

  getAdmissionList() {
    this.requestService
      .getRequestAdmissionById({
        id: this.requestid,
      })
      .subscribe((response: any) => {
        if (response) {
          let parseuser: any;
          if (response.requesttype == '05') {
            parseuser = parseJson(response.admissionlist);
            this.pageType = 'admissionList';
          } else {
            parseuser = parseJson(response.graduatelist);
            this.pageType = 'graduateList';
          }
          parseuser.forEach((user: any, index: any) => {
            user.index = index;
            user.subjects = JSON.parse(user.subjects);
            user.teachingpracticeschool = JSON.parse(user.teachingpracticeschool);
            user.originaldegree = JSON.parse(user.originaldegree);
            this.user.push(this.edituser(user));
          });
          this.requestNo = response.requestno;
          this.requestDate = response.requestdate;
          this.requeststatus = response.requeststatus;

          const userId = Number(getCookie('userId'));

          this.payload = {
            id: response.id,
            requestid: response.requestid,
            requestprocess: response.requestprocess,
            requeststatus: response.requeststatus,
            process: response.requestprocess,
            status: response.requeststatus,
            requesttype: this.pageType == 'admissionList' ? '05' : '06',
            uniuserid: userId,
            systemtype: response.systemtype,
            subtype: response.subtype,
            unirequestdegreecertid: response.unirequestdegreecertid,
            unidegreecertid: response.unidegreecertid,
            degreeapprovecode: response.degreeapprovecode,
            planyear: response.planyear,
            plancalendaryear: response.plancalendaryear,
            planname: response.planname,
            plantotalno: response.plantotalno,
            currentadmissionno: response.currentadmissionno,
            currentgraduateno: response.currentgraduateno,
            ref1: '3',
            ref2: this.pageType == 'admissionList' ? '05' : '06',
            ref3: '5',
            admissionlist: response.admissionlist,
            graduatelist: response.graduatelist,
          };
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
    this.router.navigate(['/student-list', 'degree-list']);
  }

  get user(): FormArray {
    return this.formStudent.get('user') as FormArray;
  }

  edituser(data: any) {
    let userAddress: any;
    if (this.pageType == 'admissionList') {
      userAddress = JSON.parse(data.address);
    } else {
      userAddress = JSON.parse(data.address);
    }
    return this.fb.group({
      id: [data.id],
      checked: [data.checked ?? false],
      index: [data.index],
      no: [data.index + 1],
      admissiondate: [moment(data.admissiondate).format('YYYY-MM-DD')],
      studentno: [data.studentno],
      studentstatus: [data.studentstatus],
      originaldegree: [data.originaldegree],
      email: [data.email],
      idcardno: [data.idcardno],
      passportno: [data.passportno],
      nationality: [data.nationality],
      prefixth: [data.prefixth],
      firstnameth: [data.firstnameth],
      lastnameth: [data.lastnameth],
      prefixen: [data.prefixen],
      firstnameen: [data.firstnameen],
      middlenameen: [data.middlenameen],
      lastnameen: [data.lastnameen],
      phone: [data.phone],
      birthdate: [data.birthdate],
      address: this.fb.group({
        addressInfo: {
          location: userAddress?.location || null,
          housenumber: userAddress?.housenumber || null,
          villagenumber: userAddress?.villagenumber || null,
          lane: userAddress?.lane || null,
          road: userAddress?.road || null,
          zipcode: userAddress?.zipcode || null,
          provinceid: userAddress?.provinceid || null,
          districtid: userAddress?.districtid || null,
          subdistrictid: userAddress?.subdistrictid || null,
          remark: userAddress?.remark || null,
        },
      }),
      approveno: [data.approveno],
      graduationdate: [data.graduationdate],
      approvedate: [data.approvedate],
      subjects: data.subjects
        ? [
            {
              subject1: data.subjects.subject1,
              subject2: data.subjects.subject2,
            },
          ]
        : [
            { subject1: '', subject2: '' }
          ],
      teachingpracticeschool: [data.teachingpracticeschool],
    });
  }

  insertSubject(subjectInfo: any, index: any) {
    const dialogRef = this.dialog.open(StudentListSubjectComponent, {
      width: '600px',
      data: {
        ...subjectInfo,
        disableAll: true,
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

  viewOriginalDegree(originalDegreeInfo: any, index: any) {
    const dialogRef = this.dialog.open(OriginalDegreeDialogComponent, {
      width: '600px',
      data: {
        ...originalDegreeInfo,
        disableAll: true
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

  searchAddress(index: any) {
    const dialogRef = this.dialog.open(TrainingAddressComponent, {
      height: '100vh',
      width: '75vw',
      position: {
        top: '0px',
        right: '0px',
      },
      data: {
        teachingpracticeschool: this.user.at(index).value.teachingpracticeschool,
        disableAll: true,
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

  getCheckedValue() {
    return this.user.value.filter((data: any) => {
      return data.checked;
    });
  }

  onConfirmed(requestno: string) {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: 'บันทึกข้อมูลสำเร็จ',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/student-list', 'degree-list']);
      }
    });
  }

  next() {
    const checkeddata = this.getCheckedValue();
    const datainfo = {
      studentlist: checkeddata,
      requestno: this.requestNo,
      requestid: this.payload.requestid,
      pagetype: this.pageType,
      total: this.user.value.length,
      requestdate: this.requestDate,
      payload: { ...this.payload },
      allstudent: this.user.getRawValue()
    };

    localForage.setItem('studentform', datainfo).then(() => {
      this.router.navigate(['/degree-cert', 'consider-student']);
    });
  }

  checkdisableSave() {
    if (this.pageType == 'admissionList') {
      return this.formStudent.invalid;
    } else {
      let invalidform = false;
      let empytychecked = true;
      this.user.controls.forEach((user) => {
        if (user.value.checked && user.invalid) {
          invalidform = true;
        }
        if (user.value.checked) {
          empytychecked = false;
        }
      });
      return invalidform || empytychecked;
    }
  }

  prev() {
    this.router.navigate(['/degree-cert', 'list-approved']);
  }

  autoScroll() {
    setTimeout(() => {
      const doc = document.getElementById('address-info');
      if (doc != null) {
        doc.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
      }   
    }, 0);
  }
}
