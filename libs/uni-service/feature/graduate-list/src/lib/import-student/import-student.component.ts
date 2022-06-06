import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/ui/dialog';
import { UniversitySearchComponent } from '@ksp/shared/ui/university-search';
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
  prefixes: SelectItem[] = [];
  isGraduated = false;
  pageType = 0;
  foundUser = false;

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
    this.prefixes = [
      { label: 'นาย', value: '1' },
      { label: 'นาง', value: '2' },
      { label: 'นางสาว', value: '3' },
    ];

    this.route.paramMap.subscribe((res) => {
      //this.processType = Number(res.get('type'));
      console.log('process type = ', res);
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

    // on submit
    /* dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) this.foundUser = true;
    }); */
  }

  save() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '200px',
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
      height: '200px',
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
