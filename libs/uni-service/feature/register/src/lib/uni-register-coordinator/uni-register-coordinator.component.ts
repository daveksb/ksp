import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import localForage from 'localforage';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { UniversitySearchComponent } from '@ksp/shared/search';
import { EMPTY, Observable, switchMap } from 'rxjs';
import {
  GeneralInfoService,
  UniInfoService,
  UniRequestService,
} from '@ksp/shared/service';
import { thaiDate } from '@ksp/shared/utility';
import { RequestPageType } from '@ksp/shared/constant';
import { v4 as uuidv4 } from 'uuid';

@Component({
  templateUrl: './uni-register-coordinator.component.html',
  styleUrls: ['./uni-register-coordinator.component.scss'],
})
export class UniRegisterCoordinatorComponent implements OnInit {
  requestDate = thaiDate(new Date());
  form = this.fb.group({
    universityInfo: [{}],
    coordinator: [],
  });
  saveData: any;
  prefixName$!: Observable<any>;
  uniType$!: Observable<any>;
  occupyList$!: Observable<any>;
  requestNo: string = '';
  uploadFileList = [
    {
      name: 'หนังสือแต่งตั้งผู้ประสานงาน',
      fileid: '',
      filename: '',
    },
    {
      name: 'สำเนาบัตรประชาชน',
      fileid: '',
      filename: '',
    },
  ];
  requesttype = 1;
  systemtype = 3;
  currentprocess = 1;
  uniqueTimestamp: any = '';
  pageType = RequestPageType;
  uniData: any;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private generalInfoService: GeneralInfoService,
    private requestService: UniRequestService,
    private uniinfoService: UniInfoService
  ) {}

  ngOnInit(): void {
    this.uniqueTimestamp = `${new Date().getTime()}`;
    localForage.getItem('registerSelectedUniversity').then((res: any) => {
      if (res) {
        this.uniData = res;
      }
    });
    localForage.getItem('registerUserForm').then((res: any) => {
      if (res) {
        this.form.patchValue({
          universityInfo: {
            schoolid: res.schoolid,
            unitype: res.unitype,
            institution: res.institution,
            affiliation: res.affiliation,
          },
        });
        this.saveData = res;
      }
    });
    localForage.getItem('registerCoordinatorForm').then((res: any) => {
      if (res) {
        this.form.patchValue({
          coordinator: res.form.coordinator,
        });
      }
    });
    this.prefixName$ = this.generalInfoService.getPrefix();
    this.uniType$ = this.uniinfoService.getUniversityType();
    this.occupyList$ = this.uniinfoService.getOccupy();
  }

  search() {
    const dialogRef = this.dialog.open(UniversitySearchComponent, {
      width: '1200px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  prevPage() {
    let form = {
      form: this.form.getRawValue(),
      file: this.uploadFileList,
    };
    localForage.setItem('registerCoordinatorForm', form);
    this.router.navigate(['/', 'register', 'requester']);
  }

  cancel() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยกเลิกรายการใบคำขอใช่หรือไม่?`,
        btnLabel: 'ยืนยัน',
      },
    });
    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.showCompleteDialog();
      }
    });
  }

  showCompleteDialog() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '375px',
      data: {
        header: `ยกเลิกรายการสำเร็จ`,
        btnLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        localForage.removeItem('registerSelectedUniversity');
        localForage.removeItem('registerUserForm');
        localForage.removeItem('registerCoordinatorForm');
        this.router.navigate(['/login']);
      }
    });
  }

  next() {
    let form = {
      form: this.form.getRawValue(),
      file: this.uploadFileList,
    };
    localForage.setItem('registerCoordinatorForm', form);
    this.router.navigate(['/', 'register', 'password']);
  }
}
