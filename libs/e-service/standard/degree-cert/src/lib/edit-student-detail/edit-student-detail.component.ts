import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestPageType, studentStatusList } from '@ksp/shared/constant';
import { FileGroup } from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  EUniService,
  GeneralInfoService,
  UniInfoService,
  UniRequestService,
} from '@ksp/shared/service';
import { getCookie, idCardPattern, mapMultiFileInfo, nameEnPattern, nameThPattern, parseJson, phonePattern, thaiDate, validatorMessages } from '@ksp/shared/utility';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { OriginalDegreeDialogComponent, StudentListSubjectComponent, TrainingAddressComponent } from '@ksp/uni-service/dialog';
import { FormAddressTableComponent } from '@ksp/shared/form/others';

@Component({
  selector: 'e-service-edit-student-detail',
  templateUrl: './edit-student-detail.component.html',
  styleUrls: ['./edit-student-detail.component.scss'],
})
export class EserviceEditStudentDetailComponent implements OnInit {
  requestDate: any;
  requestNo = '';
  formSearch = this.fb.group({
    idcardno: [],
    firstname: [],
    lastname: [],
  });
  oldValue: any;
  formData = this.fb.group({
    verify: [
      {
        detail: null,
        reason: null,
        result: null,
      },
    ]
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
  prefixList: Array<any> = [];
  nationalityList: Array<any> = [];
  choices = [
    { name: 'อนุมัติ', value: 2 },
    { name: 'ไม่อนุมัติ', value: 3 },
  ];

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
  requestid = '';
  systemtype: any;
  formStudent = this.fb.group({
    user: this.fb.array([]),
  });
  submitted = false;
  validatorMessages = validatorMessages;
  studentStatusList = studentStatusList;
  prefixList$!: Observable<any>;
  nationalityList$!: Observable<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private uniInfoService: UniInfoService,
    private generalInfoService: GeneralInfoService,
    private requestService: EUniService
  ) {}

  ngOnInit() {
    this.uniqueTimestamp = uuidv4();
    this.studentDetail.disable();
    this.generalInfoService.getPrefix().subscribe((res: any) => { this.prefixList = res; });
    this.generalInfoService.getNationality().subscribe((res: any) => { this.nationalityList = res; });
    this.route.paramMap.subscribe((res) => {
      this.requestid = res.get('id') || '';
    });
    this.prefixList$ = this.generalInfoService.getPrefix();
    this.nationalityList$ = this.generalInfoService.getNationality();
    this.getRequestById();
  }

  getRequestById() {
    this.requestService
      .getRequestEditAdmissionById({id: this.requestid})
      .subscribe((response: any) => {
        if (response) {
          console.log(response);
          this.requestDate = thaiDate(new Date(response.requestdate));
          this.requestNo = response.requestno;
          this.requestid = response.id;
          this.systemtype = response.systemtype;
          const requestdata = parseJson(response.admissionlist);
          console.log(requestdata)
          this.uploadFileList = JSON.parse(requestdata.files);
          const dataEdit = requestdata.admissionlist[0];
          console.log(dataEdit);
          dataEdit.originaldegree = JSON.parse(dataEdit.originaldegree);
          // dataEdit. = JSON.parse(dataEdit.originaldegree);
          dataEdit.subjects = JSON.parse(dataEdit.subjects);
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

  clearData() {
    this.data = false;
    this.isNotFound = false;
    this.formSearch.reset();
  }

  cancel() {
    this.router.navigate(['/', 'degree-cert', 'edit-student-list']);
  }

  save() {
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
            const verifyform = this.formData.controls.verify.value as any;
            console.log(verifyform)
            const payloadKspUpdate = {
              requestid: this.requestid,
              process: '2',
              status: verifyform.result,
              detail: verifyform.detail,
              systemtype: this.systemtype,
              userid: getCookie('userId'),
            };
            this.requestService
            .requestProcessInsert(payloadKspUpdate)
            .subscribe((response: any) => {
              console.log(verifyform)
              if (verifyform.result == "2") {
                this.updateAdmission();
              } else {
                this.onCompleted(this.requestNo);
                return;
              }
            });
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        console.log(res)
        if (res) {
          this.onCompleted(this.requestNo);
        }
      });
  }

  updateAdmission() {
    const payloadUpdateData = this.user.value[0] as any;
    payloadUpdateData.addressinfo = JSON.stringify(payloadUpdateData.address);
    payloadUpdateData.originaldegree = JSON.stringify(payloadUpdateData.originaldegree);
    payloadUpdateData.teachingpracticeschool = JSON.stringify(payloadUpdateData.teachingpracticeschool);
    payloadUpdateData.subjects = JSON.stringify(payloadUpdateData.subjects);
    this.requestService.updateAdmission(payloadUpdateData).subscribe((res: any) => {
      this.onCompleted(this.requestNo);
    });
  }

  onCompleted(requestno: string) {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.cancel();
      }
    });
  }

  edituser(data: any) {
    const userAddress = JSON.parse(data.address);
    return this.fb.group({
      id: [data.id],
      checked: [data.checked ? data.checked : false],
      locked: [true],
      index: [0],
      no: [1],
      admissiondate: [moment(data.admissiondate).format('YYYY-MM-DD')],
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
        moment(data.graduationdate).format('YYYY-MM-DD'),
        Validators.required
      ],
      approvedate: [
        moment(data.approvedate).format('YYYY-MM-DD'),
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

  get user(): FormArray {
    return this.formStudent.get('user') as FormArray;
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
          this.user.at(index).value.teachingpracticeschool ?? null ,
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
