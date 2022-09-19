import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicComponentDirective } from '@ksp/shared/directive';
import { ListData } from '@ksp/shared/interface';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { thaiDate } from '@ksp/shared/utility';
import { SelfDevelopActivityTypes } from '@ksp/shared/constant';
import { SelfDevelopService, StaffService } from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss'],
})
export class ActivityDetailComponent implements OnInit {
  today = thaiDate(new Date());
  schoolId = '0010201056';
  staffId!: number;
  staff: any;

  form = this.fb.group({
    type: [null, Validators.required],
    detail: [],
  });

  activityTypes: ListData[] = [];
  @ViewChild(DynamicComponentDirective, { static: true })
  myHost!: DynamicComponentDirective;
  attachFiles = [
    {
      name: '1.สำเนาผลการปฏิบัติงานตามมาตรฐานการปฏิบัติงาน',
      fileId: '',
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
    this.activityTypes = SelfDevelopActivityTypes;
    this.checkStaffId();

    /*     this.form.valueChanges.subscribe((res) => {
      console.log('res = ', res);
    }); */
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
      .searchStaffFromId(id)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.staff = res;
      });
  }

  save() {
    const formValue = this.form.value;
    console.log('formValue.detail = ', formValue.detail);

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
    console.log('payload = ', payload);

    this.service.addSelfDevelopy(payload).subscribe((res) => {
      console.log('res = ', res);
    });
  }

  /* get activityType() {
    return this.form.controls.activityType;
  } */

  cancel() {
    this.router.navigate(['/activity', 'list']);
  }

  submit() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        btnLabel: 'ตกลง',
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        //this.onCompleted();
        this.save();
      }
    });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `ยืนยันข้อมูลสำเร็จ`,
        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/activity']);
      }
    });
  }
}

/*     this.activityType.valueChanges.subscribe((res) => {
      this.loadComponent(Number(res));
    }); */

/*
const componentList = [
  ActivityAddDegreeComponent,
  ActivityDiplomaReceiveComponent,
  ActivitySeminarComponent,
  ActivityAcademicArchivementComponent,
  ActivityLecturerComponent,
  ActivityWriteBookComponent,
  ActivityInnovationComponent,
  ActivityResearchComponent,
  ActivityRewardComponent,
  ActivityLectureRegisterComponent,
  ActivityStudyTourComponent,
  ActivityLearningMaterialComponent,
]; */

/*   loadComponent(index: number) {
    const viewContainerRef = this.myHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent<DynamicComponent>(componentList[index]);
  } */
