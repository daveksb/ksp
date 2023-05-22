import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RequestPageType, studentStatusList } from '@ksp/shared/constant';
import { FileGroup } from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  GeneralInfoService,
  LoaderService,
  UniInfoService,
  UniRequestService,
} from '@ksp/shared/service';
import { getCookie, idCardPattern, mapMultiFileInfo, nameEnPattern, nameThPattern, phonePattern, thaiDate, validatorMessages } from '@ksp/shared/utility';
import { EMPTY, Observable, Subject, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { OriginalDegreeDialogComponent, StudentListSubjectComponent, TrainingAddressComponent } from '@ksp/uni-service/dialog';
import { FormAddressTableComponent } from '@ksp/shared/form/others';
import moment from 'moment';

@Component({
  selector: 'ksp-edit-student-detail',
  templateUrl: './edit-student-detail.component.html',
  styleUrls: ['./edit-student-detail.component.scss'],
})
export class EditStudentDetailComponent implements OnInit {
  requestDate = thaiDate(new Date());
  requestNo = '';
  formSearch = this.fb.group({
    idcardno: [],
    firstname: [],
    lastname: [],
  });
  oldValue: any;
  formData = this.fb.group({
    editStudent: [],
  });
  uniqueTimestamp: any = '';
  isNotFound = false;

  studentDetail = this.fb.group({
    id: [],
    prefixth: [],
    firstnameth: [],
    lastnameth: [],
    prefixen: [],
    firstnameen: [],
    lastnameen: [],
    nationality: [],
    idcardno: [],
    passportno: [],
    email: [],
    phone: [],
  });
  formStudent = this.fb.group({
    user: this.fb.array([]),
  });
  prefixList$!: Observable<any>;
  nationalityList$!: Observable<any>;
  submitted = false;

  validatorMessages = validatorMessages;
  studentStatusList = studentStatusList;
  uploadFileList: FileGroup[] = [
    {
      name: 'สำเนาหนังสือสำคัญการเปลี่ยนชื่อ / ชื่อสกุล / เปลี่ยนหรือเพิ่มคำนำหน้าชื่อ',
      files: [],
    },
    {
      name: 'สำเนาหลักฐานการสมรส หรือการสิ้นสุดการสมรส (ถ้ามี)',
      files: [],
    },
    {
      name: 'สำเนาหนังสือรับรองการใช้คำหน้านามหญิง (ถ้ามี)',
      files: [],
    },
  ] as FileGroup[];
  data = false;
  pageType = RequestPageType;
  requesttype = 8;
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private uniInfoService: UniInfoService,
    private generalInfoService: GeneralInfoService,
    private requestService: UniRequestService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.uniqueTimestamp = uuidv4();
    this.studentDetail.disable();
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.nationalityList$ = this.generalInfoService.getNationality();
  }

  searchData() {
    const getForm = this.formSearch.value;
    if (getForm.idcardno || getForm.firstname || getForm.lastname) {
      const payload = {
        idcardno: this.formSearch.controls.idcardno.value,
        firstname: this.formSearch.controls.firstname.value,
        lastname: this.formSearch.controls.lastname.value
      };
      this.uniInfoService
        .uniAdmissionSearch2(payload)
        .subscribe((response: any) => {
          if (response.datareturn) {
            this.data = true;
            this.oldValue = response.datareturn[0];
            this.studentDetail.patchValue(response.datareturn[0]);
            const dataEdit = response.datareturn[0];
            dataEdit.subjects = dataEdit.subjects ? JSON.parse(dataEdit.subjects) : null;
            dataEdit.originaldegree = dataEdit.originaldegree ? JSON.parse(dataEdit.originaldegree) : null;
            dataEdit.teachingpracticeschool = JSON.parse(dataEdit.teachingpracticeschool);
            this.user.push(this.edituser(dataEdit));
          } else {
            this.data = false;
            this.isNotFound = true;
            this.oldValue = [];
            this.studentDetail.reset();
          }
        });
    }
  }

  edituser(data: any) {
    const parsedata = JSON.parse(data.addressinfo);
    const userAddress = parsedata?.addressInfo;
    return this.fb.group({
      id: [data.id],
      checked: [data.checked ? data.checked : false],
      locked: [data.passdata ? data.passdata : false],
      index: [0],
      no: [1],
      admissiondate: [moment(data.admissiondate).format('YYYY-MM-DD'), Validators.required],
      idcardno: [
        data.idcardno, [Validators.required, Validators.pattern(idCardPattern)]
      ],
      passportno: [data.passportno],
      nationality: [
        data.nationality, Validators.required
      ],
      studentno: [
        data.studentno, Validators.required
      ],
      studentstatus: [
        data.studentstatus, Validators.required
      ],
      originaldegree: [
        data.originaldegree,
        Validators.required
      ],
      email: [
        data.email,
        Validators.required
      ],
      prefixth: [
        data.prefixth,
        Validators.required
      ],
      firstnameth: [
        data.firstnameth, [Validators.required, Validators.pattern(nameThPattern)]
      ],
      lastnameth: [
        data.lastnameth, [Validators.required, Validators.pattern(nameThPattern)]
      ],
      prefixen: [
        data.prefixen, Validators.required
      ],
      firstnameen: [
        data.firstnameen, [Validators.required, Validators.pattern(nameEnPattern)]
      ],
      middlenameen: [
        data.middlenameen, [Validators.pattern(nameEnPattern)]
      ],
      lastnameen: [
        data.lastnameen, [Validators.required, Validators.pattern(nameEnPattern)]
      ],
      phone: [
        data.phone, [Validators.required, Validators.pattern(phonePattern)]
      ],
      birthdate: [
        data.birthdate, Validators.required
      ],
      address: userAddress ? this.fb.group({
        addressInfo: [
          {
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
        ],
      }) : this.fb.group({ addressInfo: [] }),
      approveno: [
        data.approveno,
        Validators.required
      ],
      graduationdate: [
        data.graduationdate,
        Validators.required
      ],
      approvedate: [
        data.approvedate,
        Validators.required
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
            Validators.required
          ],
      teachingpracticeschool: [data.teachingpracticeschool],
    });
  }

  clearData() {
    this.data = false;
    this.isNotFound = false;
    this.formSearch.reset();
  }

  cancel() {
    this.router.navigate(['/', 'edit-student-list', 'list']);
  }

  checkdisableSave() {
    return this.formStudent.invalid;
  }

  save() {
    console.log(this.formStudent)
    // this.submitted = true;
    if (this.formStudent.invalid) {
      return;
    }
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        subTitle: `คุณยืนยันข้อมูลและส่งเรื่องเพื่อขอนุมัติ
        ใช่หรือไม่`,
        btnLabel: 'ยืนยัน',
      },
    });

    confirmDialog.componentInstance.confirmed
      .pipe(
        switchMap((res) => {
          if (res) {
            const userId = Number(getCookie('userId'));
            const datasave = this.user.value;
              datasave.map((data: any) => {
                delete data.index;
                data.address = JSON.stringify(data.address.addressInfo);
                data.subjects = JSON.stringify(data.subjects);
                data.originaldegree = JSON.stringify(data.originaldegree);
                data.teachingpracticeschool = JSON.stringify(data.teachingpracticeschool);
              });
            const file = mapMultiFileInfo(this.uploadFileList);
            const payload = {
              id: null,
              requestprocess: '2',
              requeststatus: '1',
              requesttype: '08',
              uniuserid: userId,
              systemtype: '3',
              subtype: '5',
              unidegreecertid: this.oldValue.unidegreecertid,
              unirequestadmissionid: this.oldValue.unirequestadmissionid,
              unirequestdegreecertid: this.oldValue.unidegreecertid,
              degreeapprovecode: this.oldValue.degreeapprovecode,
              planyear: this.oldValue.planyear,
              plancalendaryear: this.oldValue.plancalendaryear,
              planname: this.oldValue.planname,
              plantotalno: this.oldValue.plantotalno,
              ref1: '3',
              ref2: '08',
              ref3: '5',
              admissionlist: '',
              fileinfo: JSON.stringify({ file }),
              idcardno: this.studentDetail.value.idcardno,
            };
            const editStudent = this.formData.value.editStudent as any;
            const studentform = this.studentDetail.value as object;
            const formsave = {
              editform: editStudent,
              studentdetail: studentform,
              admissionlist: datasave,
              files: JSON.stringify(this.uploadFileList),
              ...editStudent,
              ...studentform
            };
            payload.admissionlist = JSON.stringify(formsave);
            payload.idcardno = null;
            return this.requestService.createRequestAdmission(payload);
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res.returncode != '409') {
          this.onCompleted(res?.requestno);
        } else {
          this.onConflict();
        }
      });
  }

  onCompleted(requestno: string) {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,
        content: `วันที่ : ${this.requestDate}
        เลขที่แบบคำขอ : ${requestno}`,
        subContent: `กรุณาตรวจสอบสถานะแบบคำขอหรือรหัสเข้าใช้งาน
        ผ่านทางอีเมลผู้ที่ลงทะเบียนภายใน 3 วันทำการ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.cancel();
      }
    });
  }

  onConflict() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `ยืนยันข้อมูลไม่สำเร็จ`,
        subContent: `รายชื่อผู้เข้าศึกษาหรือผู้สำเร็จการศึกษานี้ มีรายการขอแก้ไขที่ยังไม่ได้ดำเนินการ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.cancel();
      }
    });
  }

  get user(): FormArray {
    return this.formStudent.get('user') as FormArray;
  }

  searchAddress(index: any, disable: boolean) {
    console.log(index, this.user.at(index).value);
    const dialogRef = this.dialog.open(TrainingAddressComponent, {
      height: '100vh',
      width: '75vw',
      position: {
        top: '0px',
        right: '0px',
      },
      data: {
        teachingpracticeschool: this.user.at(index).value.teachingpracticeschool ,
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

  autoScroll() {
    setTimeout(() => {
      const doc = document.getElementById('address-info');
      if (doc != null) {
        doc.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
      }   
    }, 0);
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
  
}
