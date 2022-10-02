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
import { GeneralInfoService, UniRequestService } from '@ksp/shared/service';
import localForage from 'localforage';
import { FormBuilder } from '@angular/forms';
import { EMPTY, switchMap } from 'rxjs';
import * as XLSX from 'xlsx';
import { getCookie, parseJson } from '@ksp/shared/utility';

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

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private generalInfoService: GeneralInfoService,
    private fb: FormBuilder,
    private requestService: UniRequestService,
  ) {}

  ngOnInit() {
    localForage.getItem('userlist').then((res:any) => {
      if (res) {
        this.users = res;
      }
    })
    console.log(getCookie('userId'))
    localForage.getItem('courseData').then((res:any) => {
      if (res) {
        this.courseData = res;
        this.payload = {
          id: null,
          requestprocess: '1',
          requeststatus: '1',
          requesttype: this.pageType == 'studentList' ? '05' : '06',
          uniuserid: getCookie('userId'),
          systemtype: '3',
          subtype: '5',
          unirequestdegreecertid: this.courseData.courseDetail.id,
          degreeapprovecode: this.courseData.courseDetail.degreeapprovecode,
          planyear: this.courseData.courseDetail.courseacademicyear,
          plancalendaryear: this.courseData.courseSelected.year,
          planname: this.courseData.courseSelected.label,
          plantotalno: this.courseData.courseSelected.student,
          currentadmissionno: '0',
          currentgraduateno: '0',
          ref1: '3',
          ref2: this.pageType == 'studentList' ? '05' : '06',
          ref3: '5',
          admissionlist: [],
          graduatelist: []
        }
        console.log(this.courseData)
      }
    });
    this.getNationality();
    this.getPrefix();
    this.route.paramMap.subscribe((res) => {
      // this.processType = Number(res.get('type'));
      //console.log('process type = ', res);
      this.pageType = res.get('type') || 'studentList';
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

  onRowEditInit(product: User) {
    //this.clonedProducts[product.id] = { ...product };
  }

  onRowEditSave(product: User) {}

  onRowEditCancel(product: User, index: number) {}

  cancel() {
    this.router.navigate(['./', 'home']);
  }

  addStudent() {
    this.users.push({
      index: this.users.length + 1,
      id: '',
      startdate: '2022-09-28',
      idcard: '',
      passportno: '',
      nationalityid: '',
      nationality: '',
      titlethid: '',
      titleth: '',
      firstnameth: '',
      lastnameth: '',
      titleenid: '',
      titleen: '',
      firstnameen: '',
      middlenameen: '',
      lastnameen: '',
      contactphone: '',
      birthdate: '',
      address: this.fb.group({ addressInfo: [] }),
      approvetime: '',
      graduatedate: '',
      approvedate: '',
      subject: {
        subject1: '',
        subject2: ''
      }
    })
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
        this.users[index-1].subject = res;
      }
    });
  }

  searchAddress() {
    this.dialog.open(TrainingAddressComponent, {
      height: '900px',
      width: '1000px',
    });
  }

  viewAdress(address: any) {
    console.log(address)
    this.dialog.open(FormAddressTableComponent, {
      width: '900px',
      data: {
        mode: 'view',
        address: address.value.addressInfo
      }
    });
  }

  save() {
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
            this.users.map((data: any)=>{
              delete data.index;
              data.address = data.address.getRawValue();
            })
            if (this.pageType == 'studentList') {
              this.payload.admissionlist = JSON.stringify(this.users);
            } else {
              this.payload.graduatelist = JSON.stringify(this.users);
            }
            console.log(this.payload)
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
        this.router.navigate(['/', 'home']);
      }
    });
  }

  selectedNationality(event: any, index: number) {
    const find = this.nationality.find(s=>{return s.nationId == event.target.value});
    this.users[index-1].nationality = find.nationName;
  }

  selectedPrefixTh(event: any, index: number) {
    const find = this.ThPrefixes.find(s=>{return s.id == event.target.value});
    this.users[index-1].titleth = find.name_th;
  }

  selectedPrefixEn(event: any, index: number) {
    const find = this.EngPrefixes.find(s=>{return s.id == event.target.value});
    this.users[index-1].titleen = find.name_en;
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
        console.log(data)
        data.forEach((newdata: any) => {
          this.users.push({
            index: this.users.length + 1,
            id: '',
            startdate: newdata?.startdate || null,
            idcard: newdata?.idcard || null,
            passportno: newdata?.passportno || null,
            nationalityid: newdata?.nationalityid || null,
            nationality: newdata?.nationality || null,
            titlethid: newdata?.titlethid || null,
            titleth: newdata?.titleth || null,
            firstnameth: newdata?.firstnameth || null,
            lastnameth: newdata?.lastnameth || null,
            titleenid: newdata?.titleenid || null,
            titleen: newdata?.titleen || null,
            firstnameen: newdata?.firstnameen || null,
            middlenameen: newdata?.middlenameen || null,
            lastnameen: newdata?.lastnameen || null,
            contactphone: newdata?.contactphone || null,
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
            approvetime: newdata?.approvetime || null,
            graduatedate: newdata?.graduatedate || null,
            approvedate: newdata?.approvedate || null,
            subject: {
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

}
