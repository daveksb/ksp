import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SchoolSelfDevelopActivityTies } from '@ksp/shared/constant';
import { SchStaff, ListData, FileGroup } from '@ksp/shared/interface';
import {
  SelfDevelopService,
  StaffService,
  LoaderService,
  SchoolRequestService,
} from '@ksp/shared/service';
import { getCookie, schoolMapSelfDevelopType } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subject } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'ksp-activity-view-detail',
  templateUrl: './activity-view-detail.component.html',
  styleUrls: ['./activity-view-detail.component.scss'],
})
export class ActivityViewDetailComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  schoolId = getCookie('schoolId');
  staffId!: number;
  requestid!: number;
  staff = new SchStaff();
  pageType!: number;
  uniqueTimestamp!: string;
  activityTypes: ListData[] = SchoolSelfDevelopActivityTies;
  selectedStaffId = '';
  selectedRequestId = '';
  staffSelfDev: any[] = [];
  tempLicense: any;
  schoolMapSelfDevelopType = schoolMapSelfDevelopType;
  activityPageMode = activityPageMode;

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
    private license: SchoolRequestService
  ) {}

  ngOnInit(): void {
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
        this.getSelfDevelopInfo(this.staffId);
      }
    });

    this.route.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
      if (Number(params['requestid'])) {
        this.requestid = Number(params['requestid']);
      }
      this.getTempLicense(this.requestid);
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

  getSelfDevelopInfo(staffId: any) {
    const payload = {
      staffid: staffId,
      schoolid: this.schoolId,
    };

    this.service.getSelfDevelopInfo(payload).subscribe((res) => {
      if (res) {
        this.staffSelfDev = res;
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
      }
    });
  }

  /* edit(pageType: any, staffId: number) {
    this.router.navigate(['/activity', 'detail', pageType, staffId]);
  } */

  view(pageType: any, staffId: number, requestid: number, activityid: number) {
    this.router.navigate(['/activity', 'detail', pageType, staffId], {
      queryParams: { requestid: requestid, activityid: activityid },
    });
  }

  cancel() {
    this.router.navigate(['/activity', 'list']);
  }
}

enum activityPageMode {
  view,
  edit,
}
