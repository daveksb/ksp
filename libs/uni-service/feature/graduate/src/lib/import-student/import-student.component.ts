import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UniserviceImportType } from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  OriginalDegreeDialogComponent,
  StudentListSubjectComponent,
  TrainingAddressComponent,
  ViewHistoryAdmissionComponent
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
  validatorMessages,
} from '@ksp/shared/utility';
import moment from 'moment';
import { studentStatusList } from 'libs/shared/constant/src/uni-service-constant';

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
      .getAdmissionListById({
        unidegreecertid: this.courseData?.courseDetail.id,
        planyear: this.payload.planyear,
        plancalendaryear: this.payload.plancalendaryear,
        offset: 0,
        row: 999,
      })
      .subscribe((response: any) => {
        if (response.datareturn) {
          const request = response.datareturn.filter(({process}: any) => process != '1');
          if (request && request.length > 0) {
            this.datasourceHistory = request;
            this.showHistoryButton = true;
          }
          const findResponse = response.datareturn.find((data: any) => {
            return (
              data.unidegreecertid == this.courseData?.courseDetail.id &&
              data.planyear == this.payload.planyear &&
              data.plancalendaryear == this.payload.plancalendaryear &&
              data.admissionlist &&
              (data.process == '1' ||
                (data.process == '3' && data.status == '2'))
            );
          });
          if (findResponse) {
            const parseuser = JSON.parse(findResponse.admissionlist);
            parseuser.forEach((user: any, index: any) => {
              user.index = index;
              user.subjects = JSON.parse(user.subjects);
              user.originaldegree = JSON.parse(user.originaldegree);
              this.user.push(this.edituser(user));
            });
            this.requestNo = findResponse.requestno;
            this.requestDate = findResponse.requestdate;
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
              if (res.datareturn && res.datareturn.length) {
                const request = res.datareturn.filter(({process, status}: any) => {
                  return process != '1';
                });
                if (request && request.length > 0) {
                  this.datasourceHistory = request;
                  this.showHistoryButton = true;
                }
                const findRequestGraduate = res.datareturn.find((data: any) => {
                  return (
                    data.graduatelist != null && 
                    data.requesttype == '06' && (data.process == '3' && data.status != '3')
                  );
                });
                if (findRequestGraduate) {
                  this.requestNo = findRequestGraduate.requestno;
                  this.requestDate = findRequestGraduate.requestdate;
                  this.payload.id = findRequestGraduate.id;
                  const convertGraduateList = JSON.parse(
                    findRequestGraduate.graduatelist
                  );
                  convertGraduateList.map((data: any) => {
                    const findindex = this.user.value.findIndex((user: any) => {
                      return (
                        data.idcardno == user.idcardno && data.id == user.id
                      );
                    });
                    if (findindex != -1) {
                      const userAddress = JSON.parse(data.address);
                      this.user.at(findindex).patchValue({
                        locked: findRequestGraduate.process == '2' || (findRequestGraduate.process == '3' && findRequestGraduate.status == '3') ?
                          true : findRequestGraduate.process == '3' && findRequestGraduate.status == '2' ? 
                          (data.passdata ? true : false) : false,
                        approveno: data.approveno,
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
      id: [null],
      checked: [false],
      locked: [false],
      index: [index],
      no: [index + 1],
      admissiondate: [moment().format('YYYY-MM-DD'), Validators.required],
      idcardno: ['', [Validators.required, Validators.pattern(idCardPattern)]],
      passportno: [''],
      nationality: [null, Validators.required],
      studentno: ['', Validators.required],
      studentstatus: [null, Validators.required],
      originaldegree: [null],
      email: [null, Validators.required],
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
      middlenameen: ['', [Validators.pattern(nameEnPattern)]],
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
    if (this.pageType == 'admissionList') {
      userAddress = JSON.parse(data.address);
    } else {
      const parsedata = JSON.parse(data.addressinfo);
      userAddress = parsedata?.addressInfo;
    }
    return this.fb.group({
      id: [data.id],
      checked: [data.checked ? data.checked : false],
      locked: [data.passdata ? data.passdata : false],
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

  addDatafromFile(data: any) {
    return this.fb.group({
      id: [null],
      checked: [false],
      index: [this.user.value.length],
      no: [this.user.value.length + 1],
      admissiondate: [moment(data.admissiondate).format('YYYY-MM-DD')],
      idcardno: [
        data.idcardno,
        [Validators.required, Validators.pattern(idCardPattern)],
      ],
      passportno: [data.passportno],
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
      middlenameen: [data.middlenameen, [Validators.pattern(nameEnPattern)]],
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
            this.pageType == 'admissionList' ? Validators.required : undefined,
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

  save(typeSave: string) {
    this.submitted = true;
    const invalidateData = this.checkdisableSave();
    if (invalidateData) {
      return;
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูล
        และส่งแบบคำขอ ใช่หรือไม่? `,
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
            if (this.pageType == 'admissionList') {
              const datasave = this.user.value;
              datasave.map((data: any) => {
                delete data.index;
                data.address = JSON.stringify(data.address.addressInfo);
                data.subjects = JSON.stringify(data.subjects);
                data.originaldegree = JSON.stringify(data.originaldegree);
              });
              this.payload.admissionlist = JSON.stringify(datasave);
              this.payload.graduatelist = null;
              this.payload.currentadmissionno = this.user.value.length;
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
              this.payload.currentgraduateno = this.getCheckedValue().length;
            }
            this.payload.idcardno = null;
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
    if (params) {
      const payload = {
        identity_no: params
      };
      this.uniInfoService.searchSelfStudent(payload).subscribe((response) => {
        if (response.datareturn) {
          response.datareturn.forEach((data: any) => {
            data.addressinfo = JSON.parse(data.addressinfo);
          });
          this.user.at(index).patchValue({
            firstnameth: response.first_name_th || null,
            lastnameth: response.last_name_th || null,
            firstnameen: response.first_name_en || null,
            lastnameen: response.last_name_en || null,
            email: response.email || null,
            phone: response.phone_number || null,
            admissiondate: moment().format('YYYY-MM-DD'),
            passportno: response.passportno || null,
            nationality: response.nationality || null,
            prefixth: response.prefixth || null,
            prefixen: response.prefixen || null,
            middlenameen: response.middlenameen || null,
            birthdate: response.birthdate || null,
          });
          this.user
            .at(index)
            .get('address')
            ?.patchValue(response.addressinfo ? {
              addressInfo: {
                location: [
                  response.addressinfo
                    ? response.addressinfo.location
                    : null,
                ],
                housenumber: [
                  response.addressinfo
                    ? response.addressinfo.houseNo
                    : null,
                ],
                villagenumber: [
                  response.addressinfo
                    ? response.addressinfo.moo
                    : null,
                ],
                lane: [
                  response.addressinfo
                    ? response.addressinfo.alley
                    : null,
                ],
                road: [
                  response.addressinfo
                    ? response.addressinfo.houseNo
                    : null,
                ],
                zipcode: [
                  response.addressinfo
                    ? response.addressinfo.postcode
                    : null,
                ],
                provinceid: [
                  response.addressinfo
                    ? response.addressinfo.province
                    : null,
                ],
                districtid: [
                  response.addressinfo
                    ? response.addressinfo.amphur
                    : null,
                ],
                subdistrictid: [
                  response.addressinfo
                    ? response.addressinfo.tumbol
                    : null,
                ],
                remark: [
                  response.addressinfo
                    ? response.addressinfo.remark
                    : null,
                ],
              },
            } : this.fb.group({ addressInfo: [] }));
          this.user.at(index).updateValueAndValidity();
        }
      });
    }
  }

  prev() {
    this.router.navigate([
      '/',
      'student-list',
      'course-detail',
      this.payload.unidegreecertid,
    ]);
  }

  checkdisableSave() {
    if (this.pageType == 'admissionList') {
      return this.formStudent.invalid || this.user.value.length == 0;
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
