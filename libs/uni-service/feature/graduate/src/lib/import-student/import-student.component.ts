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
import { GeneralInfoService } from '@ksp/shared/service';

@Component({
  selector: 'uni-service-import-student',
  templateUrl: './import-student.component.html',
  styleUrls: ['./import-student.component.scss'],
})
export class ImportStudentComponent implements OnInit {
  users: User[] = [];
  ThPrefixes: Array<any> = [];
  EngPrefixes: Array<any> = [];
  nationality: Array<any> = [];
  isGraduated = false;
  pageType!: UniserviceImportType;
  importType = UniserviceImportType;
  foundUser = false;

  headers = [
    [
      'ยื่นใบคำขอ',
      'ขอยื่นรายชื่อผู้เข้าศึกษาและผู้สำเร็จการศึกษา',
      'ขอยื่นรายชื่อผู้เข้าศึกษา',
    ],
    [
      'ยื่นใบคำขอ',
      'ขอยื่นรายชื่อผู้เข้าศึกษาและผู้สำเร็จการศึกษา',
      'ขอยื่นรายชื่อผู้สำเร็จการศึกษา',
    ],
  ];

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private generalInfoService: GeneralInfoService
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((res: any) => {
      this.users = res;
    });
    this.getNationality();
    this.getPrefix();
    this.route.paramMap.subscribe((res) => {
      //this.processType = Number(res.get('type'));
      //console.log('process type = ', res);
      this.pageType = Number(res.get('type'));
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
      id: this.users.length + 1,
      startDate: 'xx/xx/xxxx',
      personId: 'x-xxxx-xxxxx-xx-x',
      passportId: 'ABCxxxxxxxx',
      nationality: 'thai',
      titleTh: 'นาย',
      firstNameTh: 'อดิศร',
      lastNameTh: 'อัศวิน',
      titleEn: 'Mrs.',
      firstNameEn: 'adisorn',
      middleNameEn: 'xxx',
      lastNameEn: 'assawin',
      phone: '098-xxx-xxxx',
      birthDate: 'xx/xx/xxxx',
      address: '',
      approveTime: 1,
      graduateDate: 'xx/xx/xxxx',
      approveDate: 'xx/xx/xxxx',
      trainingAddress: '',
    })
  }

  insertSubject() {
    this.dialog.open(StudentListSubjectComponent, {
      width: '600px',
    });
  }

  searchAddress() {
    this.dialog.open(TrainingAddressComponent, {
      height: '900px',
      width: '1000px',
    });
  }

  viewAdress() {
    this.dialog.open(FormAddressTableComponent, {
      width: '900px',
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

    dialogRef.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onConfirmed();
      }
    });
  }

  onConfirmed() {
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
}
