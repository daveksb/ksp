import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  SchoolLangMapping,
  SchoolRequestSubType,
  SchoolSelfDevelopActivityTies,
} from '@ksp/shared/constant';
import { PdfRenderComponent } from '@ksp/shared/dialog';
import {
  SchStaff,
  ListData,
  FileGroup,
  SchTempLicense,
} from '@ksp/shared/interface';
import {
  SelfDevelopService,
  StaffService,
  LoaderService,
  SchoolRequestService,
  SchoolInfoService,
} from '@ksp/shared/service';
import {
  changeToEnglishMonth,
  changeToThaiNumber,
  getCookie,
  schoolMapSelfDevelopType,
  thaiDate,
} from '@ksp/shared/utility';
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
  requestId!: number;
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
  pdfTempLicense: any;

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
    private schoolInfoService: SchoolInfoService
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

  genPdf(element: SchTempLicense) {
    console.log('element = ', element);
    const position = element?.position;
    const startDate = new Date(element.licensestartdate || '');
    const endDate = new Date(element.licenseenddate || '');
    const date = new Date(element.licensestartdate || '');
    const thai = thaiDate(date);
    const [day, month, year] = thai.split(' ');
    const fulldateth = `${changeToThaiNumber(day)} เดือน ${month} พ.ศ. ${year}`;
    const fulldateen = `${day} Day of ${changeToEnglishMonth(month)} B.E. ${
      parseInt(year) - 543
    }`;
    const name = element.firstnameth + ' ' + element.lastnameth;
    const nameen = element.firstnameen + ' ' + element.lastnameen;
    const start = thaiDate(startDate);
    const end = thaiDate(endDate);
    const startth = changeToThaiNumber(start);
    const endth = changeToThaiNumber(end);
    const starten = changeToEnglishMonth(start);
    const enden = changeToEnglishMonth(end);
    const careertype = SchoolRequestSubType[+(element?.licensetype ?? '1')];
    const careertypeen = SchoolLangMapping[careertype ?? 'ครู'] ?? '';
    const requestno = element.licenseno ?? '';
    const prefix = element.licensetype == '1' ? 'ท.' : 'อ.';
    const payload = {
      schoolid: this.schoolId,
    };

    this.schoolInfoService.getSchoolInfo(payload).subscribe((res: any) => {
      const schoolname = res.schoolname;
      const bureauname = res.bureauname;
      const schoolapprovename = 'ผู้อํานวยการสถานศึกษา';
      const schoolapprovenameen = 'director of the educational institution';
      this.dialog.open(PdfRenderComponent, {
        width: '1200px',
        height: '100vh',
        data: {
          pdfType: element.licensetype,
          pdfSubType: 3,
          input: {
            prefix,
            schoolapprovename,
            schoolapprovenameen,
            requestno,
            careertype,
            careertypeen,
            name,
            nameen,
            startth,
            endth,
            starten,
            enden,
            schoolname,
            bureauname,
            day,
            month,
            year,
            position,
            fulldateth,
            fulldateen,
          },
        },
      });
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
      this.pdfTempLicense = res;
    });
  }

  edit(pageType: any, staffId: number, requestid: number, activityid: number) {
    this.router.navigate(['/activity', 'detail', pageType, staffId], {
      queryParams: { requestid: requestid, activityid: activityid },
    });
  }

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
