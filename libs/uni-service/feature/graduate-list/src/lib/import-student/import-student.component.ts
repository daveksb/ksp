import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UniserviceImportType } from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { TrainingAddressComponent } from '@ksp/uni-service/ui/dialog';
import { SelectItem } from 'primeng/api';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'uni-service-import-student',
  templateUrl: './import-student.component.html',
  styleUrls: ['./import-student.component.scss'],
})
export class ImportStudentComponent implements OnInit {
  users: User[] = [];
  ThPrefixes: SelectItem[] = [];
  EngPrefixes: SelectItem[] = [];
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
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((res: any) => {
      this.users = res;
    });
    this.ThPrefixes = [
      { label: 'นาย', value: '1' },
      { label: 'นาง', value: '2' },
      { label: 'นางสาว', value: '3' },
    ];
    this.EngPrefixes = [
      { label: 'Mr.', value: '1' },
      { label: 'Mrs.', value: '2' },
      { label: 'Miss.', value: '3' },
    ];

    this.route.paramMap.subscribe((res) => {
      //this.processType = Number(res.get('type'));
      //console.log('process type = ', res);
      this.pageType = Number(res.get('type'));
    });
  }

  onRowEditInit(product: User) {
    //this.clonedProducts[product.id] = { ...product };
  }

  onRowEditSave(product: User) {}

  onRowEditCancel(product: User, index: number) {}

  cancel() {
    this.router.navigate(['./', 'graduate-list']);
  }

  searchAddress() {
    const dialog = this.dialog.open(TrainingAddressComponent, {
      height: '900px',
      width: '1200px',
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
        this.router.navigate(['/', 'graduate-list']);
      }
    });
  }
}
