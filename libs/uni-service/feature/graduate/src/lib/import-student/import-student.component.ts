import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UniserviceImportType } from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  StudentListSubjectComponent,
  TrainingAddressComponent,
} from '@ksp/uni-service/dialog';
import { SelectItem } from 'primeng/api';
import { User } from './user';
import { UserService } from './user.service';
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
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EMPTY, switchMap } from 'rxjs';
import * as XLSX from 'xlsx';
import {
  getCookie,
  idCardPattern,
  nameEnPattern,
  nameThPattern,
  parseJson,
  phonePattern,
  thaiDate,
} from '@ksp/shared/utility';
import moment from 'moment';

@Component({
  selector: 'uni-service-import-student',
  templateUrl: './import-student.component.html',
  styleUrls: ['./import-student.component.scss'],
})
export class ImportStudentComponent implements OnInit {
  users: any = [];
  ThPrefixes: Array<any> = [];
  EngPrefixes: Array<any> = [];
  nationality: Array<any> = [];
  isGraduated = false;
  pageType = 'studentList';
  importType = UniserviceImportType;
  foundUser = false;
  courseData: any;
  payload: any;
  exceltoJson: any;
  headerStudent = {
    h1: 'ยื่นใบคำขอ',
    h2: 'ขอยื่นรายชื่อผู้เข้าศึกษาและผู้สำเร็จการศึกษา',
    h3: 'ขอยื่นรายชื่อผู้เข้าศึกษา',
  };
  headerGraduate = {
    h1: 'ยื่นใบคำขอ',
    h2: 'ขอยื่นรายชื่อผู้เข้าศึกษาและผู้สำเร็จการศึกษา',
    h3: 'ขอยื่นรายชื่อผู้สำเร็จการศึกษา',
  };
  requestNo = '';
  userBackup: any;
  requestDate:any = undefined;
  formStudent = this.fb.group({
    user: this.fb.array([]),
  });
  filterColumn = ['idcardno'];

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
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
      this.pageType = res.get('type') || 'studentList';
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
          requesttype: this.pageType == 'studentList' ? '05' : '06',
          uniuserid: userId,
          systemtype: '3',
          subtype: '5',
          unirequestdegreecertid: this.courseData.courseDetail.id,
          unidegreecertid: this.courseData.courseDetail.id,
          degreeapprovecode: this.courseData.courseDetail.degreeapprovecode,
          planyear: this.courseData.courseSelected.indexyear,
          plancalendaryear: this.courseData.courseSelected.calendaryear,
          planname: this.courseData.courseSelected.label,
          plantotalno: this.courseData.courseSelected.student,
          currentadmissionno: this.courseData.courseSelected.currentadmissionno,
          currentgraduateno: this.courseData.courseSelected.currentgraduateno,
          ref1: '3',
          ref2: this.pageType == 'studentList' ? '05' : '06',
          ref3: '5',
          admissionlist: [],
          graduatelist: [],
        };
        if (this.pageType == 'studentList') {
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
      .getAdmissionListById({
        unidegreecertid: this.courseData?.courseDetail.id,
        planyear: this.payload.planyear,
        plancalendaryear: this.payload.plancalendaryear,
        offset: 0,
        row: 999,
      })
      .subscribe((response: any) => {
        if (response.datareturn) {
          const findResponse = response.datareturn.find((data: any) => {
            return (
              data.unidegreecertid == this.courseData?.courseDetail.id &&
              data.planyear == this.payload.planyear &&
              data.plancalendaryear == this.payload.plancalendaryear &&
              data.admissionlist
            );
          });
          if (findResponse && findResponse.process == '1') {
            const parseuser = JSON.parse(findResponse.admissionlist);
            parseuser.forEach((user: any, index: any) => {
              user.index = index;
              user.subjects = JSON.parse(user.subjects);
              this.user.push(this.edituser(user));
            });
            this.requestNo = findResponse.requestno;
            this.requestDate = thaiDate(new Date(findResponse.requestdate));
            this.payload.id = findResponse.id;
          }
        }
      });
  }

  getGraduateList() {
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
            user.teachingpracticeschool = [];
            user.admissiondate = moment(user.admissiondate).format(
              'YYYY-MM-DD'
            );
            user.birthdate = moment(user.birthdate).format('YYYY-MM-DD');
            user.subjects = JSON.parse(user.subjects);
            this.user.push(this.edituser(user));
          });
          this.requestService
            .getAdmissionListById({
              unidegreecertid: this.courseData?.courseDetail.id,
              planyear: this.payload.planyear,
              plancalendaryear: this.payload.plancalendaryear,
              offset: 0,
              row: 999,
            })
            .subscribe((res: any) => {
              if (res.datareturn.length) {
                const findRequestGraduate = res.datareturn.find((data: any) => {
                  return (
                    data.graduatelist != null && data.process == '1'
                  );
                });
                if (findRequestGraduate) {
                  this.requestNo = findRequestGraduate.requestno;
                  this.requestDate = thaiDate(
                    new Date(findRequestGraduate.requestdate)
                  );
                  this.payload.id = findRequestGraduate.id;
                  const convertGraduateList = JSON.parse(
                    findRequestGraduate.graduatelist
                  );
                  convertGraduateList.map((data: any) => {
                    const findindex = this.user.value.findIndex((user: any) => {
                      return data.idcardno == user.idcardno;
                    });
                    if (findindex != -1) {
                      const userAddress = JSON.parse(data.address);
                      this.user.at(findindex).patchValue({
                        approvedate: moment(data.approvedate).format(
                          'YYYY-MM-DD'
                        ),
                        graduationdate: moment(data.graduationdate).format(
                          'YYYY-MM-DD'
                        ),
                        checked: true,
                        teachingpracticeschool: JSON.parse(
                          data.teachingpracticeschool
                        ),
                        address: this.fb.group({
                          addressInfo: [
                            {
                              location: [userAddress?.location || null],
                              housenumber: [userAddress?.housenumber || null],
                              villagenumber: [
                                userAddress?.villagenumber || null,
                              ],
                              lane: [userAddress?.lane || null],
                              road: [userAddress?.road || null],
                              zipcode: [userAddress?.zipcode || null],
                              provinceid: [userAddress?.provinceid || null],
                              districtid: [userAddress?.districtid || null],
                              subdistrictid: [
                                userAddress?.subdistrictid || null,
                              ],
                              remark: [userAddress?.remark || null],
                            },
                          ],
                        }),
                      });
                    }
                  });
                }
              }
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
    this.router.navigate(['/student-list', 'degree-list']);
  }

  get user(): FormArray {
    return this.formStudent.get('user') as FormArray;
  }

  addUsers(index: number) {
    return this.fb.group({
      checked: [false],
      index: [index],
      no: [index + 1],
      admissiondate: [moment().format('YYYY-MM-DD'), Validators.required],
      idcardno: ['', [Validators.required, Validators.pattern(idCardPattern)]],
      passportno: ['', Validators.required],
      nationality: [null, Validators.required],
      prefixth: [null, Validators.required],
      firstnameth: [
        '',
        [Validators.required, Validators.pattern(nameThPattern)],
      ],
      lastnameth: [
        '',
        [Validators.required, Validators.pattern(nameThPattern)],
      ],
      prefixen: [null, Validators.required],
      firstnameen: [
        '',
        [Validators.required, Validators.pattern(nameEnPattern)],
      ],
      middlenameen: [
        '',
        [Validators.required, Validators.pattern(nameEnPattern)],
      ],
      lastnameen: [
        '',
        [Validators.required, Validators.pattern(nameEnPattern)],
      ],
      phone: ['', [Validators.required, Validators.pattern(phonePattern)]],
      birthdate: ['', Validators.required],
      address: this.fb.group({ addressInfo: [] }),
      approveno: [
        '',
        this.pageType == 'graduateList' ? Validators.required : undefined,
      ],
      graduationdate: [
        '',
        this.pageType == 'graduateList' ? Validators.required : undefined,
      ],
      approvedate: [
        '',
        this.pageType == 'graduateList' ? Validators.required : undefined,
      ],
      subjects: [{ subject1: '', subject2: '' }, Validators.required],
      teachingpracticeschool: [],
    });
  }

  edituser(data: any) {
    let userAddress: any;
    if (this.pageType == 'studentList') {
      userAddress = JSON.parse(data.address);
    } else {
      userAddress = JSON.parse(data.addressinfo);
    }
    return this.fb.group({
      checked: [false],
      index: [data.index],
      no: [data.index + 1],
      admissiondate: [moment(data.admissiondate).format('YYYY-MM-DD')],
      idcardno: [
        data.idcardno,
        this.pageType == 'studentList'
          ? [Validators.required, Validators.pattern(idCardPattern)]
          : undefined,
      ],
      passportno: [
        data.passportno,
        this.pageType == 'studentList' ? Validators.required : undefined,
      ],
      nationality: [
        data.nationality,
        this.pageType == 'studentList' ? Validators.required : undefined,
      ],
      prefixth: [
        data.prefixth,
        this.pageType == 'studentList' ? Validators.required : undefined,
      ],
      firstnameth: [
        data.firstnameth,
        this.pageType == 'studentList'
          ? [Validators.required, Validators.pattern(nameThPattern)]
          : undefined,
      ],
      lastnameth: [
        data.lastnameth,
        this.pageType == 'studentList'
          ? [Validators.required, Validators.pattern(nameThPattern)]
          : undefined,
      ],
      prefixen: [
        data.prefixen,
        this.pageType == 'studentList' ? Validators.required : undefined,
      ],
      firstnameen: [
        data.firstnameen,
        this.pageType == 'studentList'
          ? [Validators.required, Validators.pattern(nameEnPattern)]
          : undefined,
      ],
      middlenameen: [
        data.middlenameen,
        this.pageType == 'studentList'
          ? [Validators.required, Validators.pattern(nameEnPattern)]
          : undefined,
      ],
      lastnameen: [
        data.lastnameen,
        this.pageType == 'studentList'
          ? [Validators.required, Validators.pattern(nameEnPattern)]
          : undefined,
      ],
      phone: [
        data.phone,
        this.pageType == 'studentList'
          ? [Validators.required, Validators.pattern(phonePattern)]
          : undefined,
      ],
      birthdate: [
        data.birthdate,
        this.pageType == 'studentList' ? Validators.required : undefined,
      ],
      address: this.fb.group({
        addressInfo: [
          {
            location: [userAddress?.location || null],
            housenumber: [userAddress?.housenumber || null],
            villagenumber: [userAddress?.villagenumber || null],
            lane: [userAddress?.lane || null],
            road: [userAddress?.road || null],
            zipcode: [userAddress?.zipcode || null],
            provinceid: [userAddress?.provinceid || null],
            districtid: [userAddress?.districtid || null],
            subdistrictid: [userAddress?.subdistrictid || null],
            remark: [userAddress?.remark || null],
          },
        ],
      }),
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
            this.pageType == 'studentList' ? Validators.required : undefined,
          ],
      teachingpracticeschool: [data.teachingpracticeschool],
    });
  }

  addDatafromFile(data: any) {
    return this.fb.group({
      checked: [false],
      index: [this.user.value.length],
      no: [this.user.value.length + 1],
      admissiondate: [moment(data.admissiondate).format('YYYY-MM-DD')],
      idcardno: [
        data.idcardno,
        [Validators.required, Validators.pattern(idCardPattern)],
      ],
      passportno: [data.passportno, Validators.required],
      nationality: [data.nationality, Validators.required],
      prefixth: [data.prefixth, Validators.required],
      firstnameth: [
        data.firstnameth,
        [Validators.required, Validators.pattern(nameThPattern)],
      ],
      lastnameth: [
        data.lastnameth,
        [Validators.required, Validators.pattern(nameThPattern)],
      ],
      prefixen: [data.prefixen, Validators.required],
      firstnameen: [
        data.firstnameen,
        [Validators.required, Validators.pattern(nameEnPattern)],
      ],
      middlenameen: [
        data.middlenameen,
        [Validators.required, Validators.pattern(nameEnPattern)],
      ],
      lastnameen: [
        data.lastnameen,
        [Validators.required, Validators.pattern(nameEnPattern)],
      ],
      phone: [
        data.phone,
        [Validators.required, Validators.pattern(phonePattern)],
      ],
      birthdate: [data.birthdate, Validators.required],
      address: this.fb.group({
        addressInfo: [
          {
            location: [data?.location || null],
            housenumber: [data?.housenumber || null],
            villagenumber: [data?.villagenumber || null],
            lane: [data?.lane || null],
            road: [data?.road || null],
            zipcode: [data?.zipcode || null],
            provinceid: [data?.provinceid || null],
            districtid: [data?.districtid || null],
            subdistrictid: [data?.subdistrictid || null],
            remark: [data?.remark || null],
          },
        ],
      }),
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
            { subject1: data.subject1, subject2: data.subject2 },
            Validators.required,
          ]
        : [
            { subject1: '', subject2: '' },
            this.pageType == 'studentList' ? Validators.required : undefined,
          ],
      teachingpracticeschool: [data.teachingpracticeschool],
    });
  }

  addStudent() {
    if (
      this.formStudent.controls.user.value.length <
      this.courseData.courseSelected.student
    ) {
      this.formStudent.markAllAsTouched();
      this.user.push(this.addUsers(this.user.length));
    }
  }

  insertSubject(subjectInfo: any, index: any) {
    const dialogRef = this.dialog.open(StudentListSubjectComponent, {
      width: '600px',
      data: {
        ...subjectInfo,
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

  searchAddress(index: any) {
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

  save(typeSave: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        และส่งใบคำขอ ใช่หรือไม่? `,
      },
    });

    dialogRef.componentInstance.confirmed
      .pipe(
        switchMap((res) => {
          if (res) {
            if (typeSave == 'temp') {
              this.payload.requestprocess = '1';
              this.payload.process = '1';
            } else {
              this.payload.requestprocess = '2';
              this.payload.process = '2';
            }
            if (this.pageType == 'studentList') {
              const datasave = this.user.value;
              datasave.map((data: any) => {
                delete data.index;
                data.address = JSON.stringify(data.address.addressInfo);
                data.subjects = JSON.stringify(data.subjects);
              });
              this.payload.admissionlist = JSON.stringify(datasave);
              this.payload.graduatelist = null;
            } else {
              const graduatelist = this.getCheckedValue();
              graduatelist.map((data: any) => {
                data.address = JSON.stringify(data.address.addressInfo);
                data.subjects = JSON.stringify(data.subjects);
                data.teachingpracticeschool = JSON.stringify(
                  data.teachingpracticeschool
                );
              });
              this.payload.graduatelist = JSON.stringify(graduatelist);
              this.payload.admissionlist = null;
            }
            return this.requestService.createRequestAdmission(this.payload);
          }
          return EMPTY;
        })
      )
      .subscribe((res) => {
        if (res) {
          this.onConfirmed(res?.requestno);
        }
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
        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/student-list', 'degree-list']);
      }
    });
  }

  async onFileSelected(event: any) {
    this.exceltoJson = {};
    const target: DataTransfer = <DataTransfer>event.target;
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    this.exceltoJson['filename'] = target.files[0].name;
    reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
      for (let i = 0; i < wb.SheetNames.length; ++i) {
        const wsname: string = wb.SheetNames[i];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws) || {};
        data.forEach((newdata: any) => {
          this.user.push(this.addDatafromFile(newdata));
        });
      }
    };
  }

  downloadfile() {
    window.open('/assets/file/admission_example.xlsx', '_blank');
  }

  searchByIdcard(params: any, index: any) {
    if (params.idcardno || params.passportno) {
      const payload = {
        idcardno: params.idcardno,
        passportno: params.passportno,
        offset: 0,
        row: 10,
      };
      this.uniInfoService.searchSelfStudent(payload).subscribe((response) => {
        if (response.datareturn) {
          this.user.at(index).patchValue({
            admissiondate: moment().format('YYYY-MM-DD'),
            idcardno: response.datareturn[0].idcardno,
            passportno: response.datareturn[0].passportno,
            nationality: response.datareturn[0].nationality,
            prefixth: response.datareturn[0].prefixth,
            firstnameth: response.datareturn[0].firstnameth,
            lastnameth: response.datareturn[0].lastnameth,
            prefixen: response.datareturn[0].prefixen,
            firstnameen: response.datareturn[0].firstnameen,
            middlenameen: response.datareturn[0].middlenameen,
            lastnameen: response.datareturn[0].lastnameen,
            phone: response.datareturn[0].phone,
            birthdate: moment(response.datareturn[0].birthdate).format(
              'YYYY-MM-DD'
            ),
            address: response.datareturn[0].addressinfo
              ? this.fb.group({
                  addressInfo: [
                    {
                      location: [response.datareturn[0].addressinfo.location],
                      housenumber: [response.datareturn[0].addressinfo.houseNo],
                      villagenumber: [response.datareturn[0].addressinfo.moo],
                      lane: [response.datareturn[0].addressinfo.alley],
                      road: [response.datareturn[0].addressinfo.houseNo],
                      zipcode: [response.datareturn[0].addressinfo.postcode],
                      provinceid: [response.datareturn[0].addressinfo.province],
                      districtid: [response.datareturn[0].addressinfo.amphur],
                      subdistrictid: [
                        response.datareturn[0].addressinfo.tumbol,
                      ],
                      remark: [],
                    },
                  ],
                })
              : this.fb.group({ addressInfo: [] }),
          });
        }
      });
    }
  }

  checkdisableSave() {
    if (this.pageType == 'studentList') {
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
}
