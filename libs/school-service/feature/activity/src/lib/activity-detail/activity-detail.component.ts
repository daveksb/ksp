import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FileGroup, ListData, SchStaff } from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import {
  getCookie,
  mapMultiFileInfo,
  parseJson,
  schoolMapSelfDevelopType,
} from '@ksp/shared/utility';
import { SchoolSelfDevelopActivityTies } from '@ksp/shared/constant';
import {
  LoaderService,
  SchoolRequestService,
  SelfDevelopService,
  StaffService,
} from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { v4 as uuidv4 } from 'uuid';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'ksp-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss'],
})
export class ActivityDetailComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  schoolId = getCookie('schoolId');
  staffId!: number;
  requestId!: number;
  activityId!: any;
  staff = new SchStaff();
  pageType!: number;
  activityPageMode = activityPageMode;
  uniqueNo!: string;
  activityTypes: ListData[] = SchoolSelfDevelopActivityTies;
  selectedStaffId = '';
  selectedRequestId = '';
  mode: 'view' | 'edit' = 'edit';

  staffSelfDev: any[] = [];
  tempLicense: any;
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
    private loaderService: LoaderService,
    private license: SchoolRequestService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.uniqueNo = uuidv4();
    this.checkStaffId();

    this.route.paramMap.pipe(untilDestroyed(this)).subscribe((res) => {
      this.pageType = Number(res.get('pageType'));
      //console.log('process type = ', this.pageType);
      if (this.pageType === 0) {
        this.form.controls.type.disable();
        this.mode = 'view';
      }
    });
  }

  checkStaffId() {
    this.route.paramMap.subscribe((params) => {
      this.staffId = Number(params.get('staffid'));
      if (this.staffId) {
        this.loadStaffFromId(this.staffId);
        this.getSelfDevelopInfo(this.staffId);
      }
    });

    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      if (Number(params['requestid'])) {
        this.requestId = Number(params['requestid']);
      }
      this.getTempLicense(this.requestId);
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
      selfdevelopfiles: JSON.stringify(mapMultiFileInfo(this.attachFiles)),
      staffid: `${this.staffId}`,
      schoolid: `${this.schoolId}`,
    };
    //console.log('payload = ', payload);

    this.service.addSelfDevelop(payload).subscribe((res) => {
      this.completeDialog();
    });
  }

  patchData(res: any) {
    const data = parseJson(res[this.activityId].selfdevelopdetail || '');
    //console.log('data = ', data);

    this.form.controls.type.patchValue(res[this.activityId].selfdeveloptype);
    if (this.form.controls.type.value) {
      this.form.controls.detail.patchValue(data);

      const fileinfo = parseJson(res.selfdevelopfiles || '');
      if (fileinfo) {
        this.attachFiles.forEach(
          (group, index) => (group.files = fileinfo[index])
        );
      }
    }
  }

  getSelfDevelopInfo(staffId: any) {
    const payload = {
      staffid: staffId,
      schoolid: this.schoolId,
    };

    this.service.getSelfDevelopInfo(payload).subscribe((res) => {
      if (res) {
        this.staffSelfDev = res;

        this.route.queryParams
          .pipe(untilDestroyed(this))
          .subscribe((params) => {
            if (Number(params['activityid'])) {
              this.activityId = Number(params['activityid'] - 1);
              //console.log('process type = ', this.activityId);
              if (this.activityId >= '0') {
                this.patchData(res);
              }
            }
          });
      }
    });
  }

  getTempLicense(reqid: any) {
    this.license.getTempLicense(reqid).subscribe((res) => {
      if (res) {
        const licenseno = res.licenseno;
        const firstname = res.firstnameth;
        const lastname = res.lastnameth;
        const startdate = res.licensestartdate;
        const enddate = res.licenseenddate;

        const data = {
          licenseno,
          firstname,
          lastname,
          startdate,
          enddate,
        };

        this.tempLicense = data;
        //console.log('this.tempLicense = ', this.tempLicense);
      }
    });
  }

  cancel() {
    this.router.navigate(['/activity', 'list']);
  }

  back() {
    this.location.back();
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
