import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FileGroup,
  KspRequest,
  ListData,
  SchStaff,
  SelfLicense,
} from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { getCookie, schoolMapSelfDevelopType } from '@ksp/shared/utility';
import { SchoolSelfDevelopActivityTies } from '@ksp/shared/constant';
import {
  SchoolLicenseService,
  SchoolRequestService,
  SelfDevelopService,
  StaffService,
} from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { v4 as uuidv4 } from 'uuid';

@UntilDestroy()
@Component({
  selector: 'ksp-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss'],
})
export class ActivityDetailComponent implements OnInit {
  schoolId = getCookie('schoolId');
  staffId!: number;
  staff = new SchStaff();
  pageType!: number;
  activityPageMode = activityPageMode;
  uniqueTimestamp!: string;
  activityTypes: ListData[] = SchoolSelfDevelopActivityTies;
  notFound = false;
  foundLicenses: SelfLicense[] = [];
  selectedStaffId = '';
  selectedReqId = '';
  selfDevelop: any;
  tempLicense: any;
  kuruspaNo = '';
  schoolMapSelfDevelopType = schoolMapSelfDevelopType;

  form = this.fb.group({
    type: [null, Validators.required],
    detail: [],
  });

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
    private staffService: StaffService,
    private reqService: SchoolRequestService,
    private licenseService: SchoolLicenseService
  ) {}

  ngOnInit(): void {
    this.uniqueTimestamp = uuidv4();
    this.checkStaffId();

    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((res) => {
      this.pageType = Number(res.get('pageType'));
      //console.log('page type = ', this.pageType);
    });

    /* this.route.paramMap.pipe(untilDestroyed(this)).subscribe((res) => {
      this.selectedReqId = String(res.get('reqId'));
      //console.log('req id = ', this.selectedReqId);
    }); */

    this.getSelfDevelopInfo();
    this.getTempLicenseInfo();
  }

  /* searchLicense(idCard: any) {
    this.notFound = false;

    const payload = {
      cardno: idCard,
      licenseno: null,
      name: null,
      licensetype: null,
      licensestatus: null,
      offset: '0',
      row: '100',
    };

    this.licenseService
      .getStaffLicenses(payload)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        if (res) {
          this.foundLicenses = res;
        } else {
          this.foundLicenses = [];
          this.notFound = true;
          console.log('res = ', this.notFound);
        }
      });
  } */

  getSelfDevelopInfo() {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((res) => {
      this.selectedStaffId = String(res.get('staffId'));
      //console.log('staff id = ', this.selectedStaffId);
    });

    const payload = {
      staffid: this.selectedStaffId,
      schoolid: this.schoolId,
    };

    this.service.getSelfDevelopInfo(payload).subscribe((res) => {
      if (res) {
        this.selfDevelop = res;
      } else {
        this.notFound = true;
      }
      console.log('notFound = ', this.notFound);
    });
  }

  getTempLicenseInfo() {
    this.reqService.getTempLicense('524').subscribe((res) => {
      this.tempLicense = res;
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
        console.log('staff = ', this.staff);
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
