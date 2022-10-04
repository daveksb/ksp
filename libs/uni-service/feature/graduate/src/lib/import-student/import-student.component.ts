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
import { GeneralInfoService, UniInfoService, UniRequestService } from '@ksp/shared/service';
import localForage from 'localforage';
import { FormBuilder } from '@angular/forms';
import { EMPTY, switchMap } from 'rxjs';
import * as XLSX from 'xlsx';
import { getCookie, parseJson, thaiDate } from '@ksp/shared/utility';
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
  pageType!: string;
  importType = UniserviceImportType;
  foundUser = false;
  courseData: any;
  payload: any;
  exceltoJson: any;
  headerStudent = { 
    h1: 'ยื่นใบคำขอ', 
    h2: 'ขอยื่นรายชื่อผู้เข้าศึกษาและผู้สำเร็จการศึกษา', 
    h3: 'ขอยื่นรายชื่อผู้เข้าศึกษา'
  }
  headerGraduate = { 
    h1: 'ยื่นใบคำขอ', 
    h2: 'ขอยื่นรายชื่อผู้เข้าศึกษาและผู้สำเร็จการศึกษา', 
    h3: 'ขอยื่นรายชื่อผู้สำเร็จการศึกษา'
  }
  requestNo = '';
  userBackup: any;
  requestDate = thaiDate(new Date());

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
    localForage.getItem('userlist').then((res:any) => {
      if (res) {
        this.users = res;
      }
    })
    const userId = Number(getCookie('userId'));
    localForage.getItem('courseData').then((res:any) => {
      if (res) {
        this.courseData = res;
        this.payload = {
          id: null,
          requestprocess: '1',
          requeststatus: '1',
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
          graduatelist: []
        }
        console.log(this.courseData)
        if (this.pageType == 'studentList') {
          this.getAdmissionList();
        } else {
          this.getGraduateList();
        }
      }
    });
    this.getNationality();
    this.getPrefix();
    this.route.paramMap.subscribe((res) => {
      this.pageType = res.get('type') || 'studentList';
    });
  }

  getAdmissionList() {
    this.requestService.getAdmissionListById(
      { unidegreecertid: this.courseData?.courseDetail.id,
        planyear: this.payload.planyear,
        plancalendaryear: this.payload.plancalendaryear,
        offset: 0,
        row: 999
      })
      .subscribe((response: any) => {
        if (response.datareturn) {
          const findResponse = response.datareturn.find((data: any) => {
            return data.unidegreecertid == this.courseData?.courseDetail.id 
                  && data.planyear == this.payload.planyear
                  && data.plancalendaryear == this.payload.plancalendaryear
                  && data.admissionlist
          });
          if (findResponse && findResponse.requestprocess == '1') {
            this.users = JSON.parse(findResponse.admissionlist);
            this.requestNo = findResponse.requestno;
            this.requestDate = thaiDate(new Date(findResponse.requestdate));
            this.payload.id = findResponse.id;
            this.users.forEach((user: any, index: number) => {
              user.index = index+1;
              const userAddress = JSON.parse(user.address)
              user.address = this.fb.group({
                addressInfo: [{
                  location: [userAddress?.location || null],
                  housenumber: [userAddress?.housenumber || null],
                  villagenumber: [userAddress?.villagenumber || null],
                  lane: [userAddress?.lane || null],
                  road: [userAddress?.road || null],
                  zipcode: [userAddress?.zipcode || null],
                  provinceid: [userAddress?.provinceid || null],
                  districtid: [userAddress?.districtid || null],
                  subdistrictid: [userAddress?.subdistrictid || null],
                  remark: []
                }]
              })
            });
          }
        }
      });
  }

  getGraduateList() {
    this.requestService.getGraduateListById(
      { 
        unidegreecertid: this.courseData?.courseDetail.id,
        planyear: this.payload.planyear,
        plancalendaryear: this.payload.plancalendaryear,
        offset: 0,
        row: 999
      }).subscribe((response: any) => {
        if (response.datareturn) {
          this.users = response.datareturn;
          this.users.forEach((user: any, index: number) => {
            user.index = index;
            user.no = index+1;
            user.teachingpracticeschool = [];
            user.admissiondate = moment(user.admissiondate).format('YYYY-MM-DD');
            user.birthdate = moment(user.birthdate).format('YYYY-MM-DD');
            if (user.addressinfo) {
              const userAddress = JSON.parse(user.addressinfo)
              user.address = this.fb.group({
                addressInfo: [{
                  location: [userAddress?.location || null],
                  housenumber: [userAddress?.housenumber || null],
                  villagenumber: [userAddress?.villagenumber || null],
                  lane: [userAddress?.lane || null],
                  road: [userAddress?.road || null],
                  zipcode: [userAddress?.zipcode || null],
                  provinceid: [userAddress?.provinceid || null],
                  districtid: [userAddress?.districtid || null],
                  subdistrictid: [userAddress?.subdistrictid || null],
                  remark: []
                }]
              })
            } else {
              user.address = this.fb.group({ addressInfo: [] })
            }
          });
          this.userBackup = [...this.users];
          this.requestService.getAdmissionListById(
            { unidegreecertid: this.courseData?.courseDetail.id,
              planyear: this.payload.planyear,
              plancalendaryear: this.payload.plancalendaryear,
              offset: 0,
              row: 999
            }).subscribe((res: any) => {
              if (res.datareturn.length) {
                const findRequestGraduate = res.datareturn.find((data: any) => {
                  return data.graduatelist != null && data.requestprocess == '1';
                });
                if (findRequestGraduate) {
                  this.requestNo = findRequestGraduate.requestno;
                  this.requestDate = thaiDate(new Date(findRequestGraduate.requestdate));
                  this.payload.id = findRequestGraduate.id;
                  const convertGraduateList = JSON.parse(findRequestGraduate.graduatelist);
                  convertGraduateList.map((data: any) => {
                    this.users.map((user: any) => {
                      if (data.idcardno == user.idcardno) {
                        user.approvedate = moment(data.approvedate).format('YYYY-MM-DD');
                        user.graduationdate = moment(data.graduationdate).format('YYYY-MM-DD');
                        user.checked = true;
                        user.teachingpracticeschool = JSON.parse(data.teachingpracticeschool);
                        const userAddress = JSON.parse(data.address);
                        user.address = this.fb.group({
                          addressInfo: [{
                            location: [userAddress?.location || null],
                            housenumber: [userAddress?.housenumber || null],
                            villagenumber: [userAddress?.villagenumber || null],
                            lane: [userAddress?.lane || null],
                            road: [userAddress?.road || null],
                            zipcode: [userAddress?.zipcode || null],
                            provinceid: [userAddress?.provinceid || null],
                            districtid: [userAddress?.districtid || null],
                            subdistrictid: [userAddress?.subdistrictid || null],
                            remark: []
                          }]
                        })
                      }
                    })
                  })
                }
              }
            })
        }
      });
  }

  getNationality() {
    this.generalInfoService.getNationality().subscribe(response => {
      if (response) {
        this.nationality = response;
      }
    });
  }

  getPrefix() {
    this.generalInfoService.getPrefix().subscribe(response => {
      if (response) {
        this.ThPrefixes = response;
        this.EngPrefixes = response;
      }
    });
  }

  cancel() {
    this.router.navigate(['./', 'home']);
  }

  addStudent() {
    if (this.users.length < this.courseData.courseSelected.student) {
      this.users.push({
        index: this.users.length,
        no: this.users.length + 1,
        admissiondate: moment().format('YYYY-MM-DD'),
        idcardno: '',
        passportno: '',
        nationality: null,
        prefixth: null,
        firstnameth: '',
        lastnameth: '',
        prefixen: null,
        firstnameen: '',
        middlenameen: '',
        lastnameen: '',
        phone: '',
        birthdate: '',
        address: this.fb.group({ addressInfo: [] }),
        approveno: '',
        graduationdate: '',
        approvedate: '',
        subjects: {
          subject1: '',
          subject2: ''
        }
      })
    }
  }

  insertSubject(subjectInfo: any, index: any) {
    const dialogRef = this.dialog.open(StudentListSubjectComponent, {
      width: '600px',
      data: {
        ...subjectInfo
      }
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.users[index-1].subjects = res;
      }
    });
  }

  searchAddress(index: any) {
    const dialogRef = this.dialog.open(TrainingAddressComponent, {
      height: '900px',
      width: '1000px',
      data: {
        teachingpracticeschool: this.users[index].teachingpracticeschool
      }
    });
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response) {
        this.users[index].teachingpracticeschool = response;
        console.log(this.users)
      }
    })
  }

  viewAdress(address: any) {
    this.dialog.open(FormAddressTableComponent, {
      width: '900px',
      data: {
        mode: 'view',
        address: address.value.addressInfo || {}
      }
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
            } else {
              this.payload.requestprocess = '2';
            }
            this.users.map((data: any)=>{
              delete data.index;
              data.address = JSON.stringify(data.address.controls.addressInfo.getRawValue());
              data.subjects = JSON.stringify(data.subjects);
              data.teachingpracticeschool = JSON.stringify(data.teachingpracticeschool);
            })
            console.log(this.users)
            if (this.pageType == 'studentList') {
              this.payload.admissionlist = JSON.stringify(this.users);
              this.payload.graduatelist = null;
            } else {
              this.payload.graduatelist = JSON.stringify(this.getCheckedValue());
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
    return this.users.filter((data: any)=>{return data.checked});
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

  selectedNationality(event: any, index: number) {
    const find = this.nationality.find(s=>{return s.nationId == event.target.value});
    this.users[index-1].nationality = find.nationName;
  }

  selectedPrefixTh(event: any, index: number) {
    const find = this.ThPrefixes.find(s=>{return s.id == event.target.value});
    this.users[index-1].prefixth = find.name_th;
  }

  selectedPrefixEn(event: any, index: number) {
    const find = this.EngPrefixes.find(s=>{return s.id == event.target.value});
    this.users[index-1].prefixen = find.name_en;
  }

  tempSave() {
    localForage.setItem('userlist', this.users);
  }

  async onFileSelected(event: any) {
    this.exceltoJson = {};
    const target: DataTransfer = <DataTransfer>(event.target);
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
          this.users.push({
            index: this.users.length + 1,
            id: '',
            admissiondate: newdata?.admissiondate || null,
            idcardno: newdata?.idcard || null,
            passportno: newdata?.passportno || null,
            nationality: newdata?.nationality || null,
            prefixth: newdata?.prefixth || null,
            firstnameth: newdata?.firstnameth || null,
            lastnameth: newdata?.lastnameth || null,
            prefixen: newdata?.prefixen || null,
            firstnameen: newdata?.firstnameen || null,
            middlenameen: newdata?.middlenameen || null,
            lastnameen: newdata?.lastnameen || null,
            phone: newdata?.phone || null,
            birthdate: newdata?.birthdate || null,
            address: this.fb.group({ addressInfo: [{
              location: [newdata?.location || null],
              housenumber: [newdata?.housenumber || null],
              villagenumber: [newdata?.villagenumber || null],
              lane: [newdata?.lane || null],
              road: [newdata?.road || null],
              zipcode: [newdata?.zipcode || null],
              provinceid: [newdata?.provinceid || null],
              districtid: [newdata?.districtid || null],
              subdistrictid: [newdata?.subdistrictid || null],
              remark: []
            }] }),
            approveno: newdata?.approveno || null,
            graduationdate: newdata?.graduationdate || null,
            approvedate: newdata?.approvedate || null,
            subjects: {
              subject1: newdata?.subject1 || null,
              subject2: newdata?.subject2 || null
            }
          });
        });
      }
    };
  }

  downloadfile() {
    window.open('/assets/file/admission_example.xlsx', '_blank');
  }

  filterList(object: string, value: string) {
    if (value) {
      this.users = this.userBackup.filter((user: any)=>{
        return user[object].includes(value);
      })
    } else {
      this.users = this.userBackup;
    }
  }

  searchByIdcard(params: any, index: number) {
    if (params.idcardno || params.passportno) {
      const payload = {
        idcardno: params.idcardno,
        passportno: params.passportno,
        offset: 0,
        row: 10
      }
      this.uniInfoService.searchSelfStudent(payload)
      .subscribe((response => {
        if (response.datareturn) {
          this.users[index-1].admissiondate =  moment().format('YYYY-MM-DD'),
          this.users[index-1].idcardno = response.datareturn[0].idcardno,
          this.users[index-1].passportno = response.datareturn[0].passportno,
          this.users[index-1].nationality = response.datareturn[0].nationality,
          this.users[index-1].prefixth = response.datareturn[0].prefixth,
          this.users[index-1].firstnameth = response.datareturn[0].firstnameth,
          this.users[index-1].lastnameth = response.datareturn[0].lastnameth,
          this.users[index-1].prefixen = response.datareturn[0].prefixen,
          this.users[index-1].firstnameen = response.datareturn[0].firstnameen,
          this.users[index-1].middlenameen = response.datareturn[0].middlenameen,
          this.users[index-1].lastnameen = response.datareturn[0].lastnameen,
          this.users[index-1].phone = response.datareturn[0].phone,
          this.users[index-1].birthdate = moment(response.datareturn[0].birthdate).format('YYYY-MM-DD'),
          this.users[index-1].address = this.fb.group({ addressInfo: [{
            location: [response.datareturn[0].addressinfo.location],
            housenumber: [response.datareturn[0].addressinfo.houseNo],
            villagenumber: [response.datareturn[0].addressinfo.moo],
            lane: [response.datareturn[0].addressinfo.alley],
            road: [response.datareturn[0].addressinfo.houseNo],
            zipcode: [response.datareturn[0].addressinfo.postcode],
            provinceid: [response.datareturn[0].addressinfo.province],
            districtid: [response.datareturn[0].addressinfo.amphur],
            subdistrictid: [response.datareturn[0].addressinfo.tumbol],
            remark: []
          }] })
        }
    }))
    }
  }
}
