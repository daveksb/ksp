import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FileGroup, ListData, SchStaff } from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { getCookie, thaiDate } from '@ksp/shared/utility';
import { SchoolSelfDevelopActivityTies } from '@ksp/shared/constant';
import { SelfDevelopService, StaffService } from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { v4 as uuidv4 } from 'uuid';

@UntilDestroy()
@Component({
  selector: 'ksp-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss'],
})
export class ActivityDetailComponent implements OnInit {
  today = thaiDate(new Date());
  schoolId = getCookie('schoolId');
  staffId!: number;
  staff = new SchStaff();
  pageType!: number;
  activityPageMode = activityPageMode;
  uniqueTimestamp!: string;

  form = this.fb.group({
    type: [null, Validators.required],
    detail: [],
  });

  activityTypes: ListData[] = SchoolSelfDevelopActivityTies;

  attachFiles: FileGroup[] = [
    {
      name: '1.สำเนาผลการปฏิบัติงานตามมาตรฐานการปฏิบัติงาน',
      files: [],
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private service: SelfDevelopService,
    private staffService: StaffService
  ) {}

  ngOnInit(): void {
    this.uniqueTimestamp = uuidv4();
    this.checkStaffId();

    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((res) => {
      this.pageType = Number(res.get('pageType'));
      //console.log('process type = ', this.pageType);
    });
  }

  checkStaffId() {
    this.route.paramMap.subscribe((params) => {
      this.staffId = Number(params.get('staffid'));
      if (this.staffId) {
        this.loadStaffFromId(this.staffId);
      }
    });
  }

  loadStaffFromId(id: number) {
    this.staffService
      .loadStaffFromId(id)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.staff = res;
      });
  }

  addSelfDevelop() {
    const formValue = this.form.value;
    //console.log('formValue.detail = ', formValue.detail);

    const payload = {
      licenseno: null,
      licensetype: null,
      idcardno: `${this.staff.idcardno}`,
      prefixth: `${this.staff.prefixth}`,
      firstnameth: `${this.staff.firstnameth}`,
      lastnameth: `${this.staff.lastnameth}`,
      selfdeveloptype: formValue.type,
      selfdevelopdetail: JSON.stringify(formValue.detail),
      selfdevelopfiles: null,
      staffid: `${this.staffId}`,
      schoolid: `${this.schoolId}`,
    };
    //console.log('payload = ', payload);

    this.service.addSelfDevelop(payload).subscribe((res) => {
      this.completeDialog();
    });
  }

  edit(pageType: any, staffId: number) {
    this.router.navigate(['/activity', 'detail', pageType, staffId]);
  }

  view(pageType: any, staffId: number) {
    this.router.navigate(['/activity', 'detail', pageType, staffId]);
  }

  cancel() {
    this.router.navigate(['/activity', 'list']);
  }

  confirmDialog() {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        btnLabel: 'ตกลง',
      },
    });

    dialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.addSelfDevelop();
      }
    });
  }

  completeDialog() {
    const dialog = this.dialog.open(CompleteDialogComponent, {
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,
        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    dialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/activity']);
      }
    });
  }
}

enum activityPageMode {
  view,
  edit,
}
