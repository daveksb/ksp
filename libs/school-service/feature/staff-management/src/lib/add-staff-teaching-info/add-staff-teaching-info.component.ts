import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { StaffPersonInfoService } from '@ksp/shared/service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

import { StaffTeachingInfoService } from './staff-teaching-info.service';

@UntilDestroy()
@Component({
  selector: 'school-service-add-staff-teaching-info',
  templateUrl: './add-staff-teaching-info.component.html',
  styleUrls: ['./add-staff-teaching-info.component.scss'],
})
export class AddStaffTeachingInfoComponent implements OnInit {
  staffTypes$!: Observable<any>;
  positionTypes$!: Observable<any>;
  academicTypes$!: Observable<any>;

  staffId!: number;

  levels = levels;
  subjects = subjects;
  status = status;

  form = this.fb.group({
    staffType: [],
    post: [],
    academicStanding: [],
    startWorkDate: [],
    endWorkDate: [],
    staffStatus: [], //checkbox
    reason: [],
    status: [],
    teachingLevel: this.fb.array([]),
    teachingSubjects: this.fb.array([]),
    statusDate: [],
    other: [],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private service: StaffPersonInfoService,
    private activatedroute: ActivatedRoute,
    private teachingInfoService: StaffTeachingInfoService
  ) {
    this.addCheckboxes();
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params) => {
      this.staffId = Number(params.get('id'));
      if (this.staffId) {
        //
      }
    });

    /*     this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((res) => {
      console.log('form = ', res);
    }); */

    this.getList();
  }

  get teachingLevelFormArray() {
    return this.form.controls.teachingLevel as FormArray;
  }

  get teachingSubjectsFormArray() {
    return this.form.controls.teachingSubjects as FormArray;
  }

  private addCheckboxes() {
    this.levels.forEach(() =>
      this.teachingLevelFormArray.push(new FormControl(false))
    );

    this.subjects.forEach(() =>
      this.teachingSubjectsFormArray.push(new FormControl(false))
    );
  }

  getList() {
    this.staffTypes$ = this.service.getStaffTypes();
    this.positionTypes$ = this.service.getPositionTypes();
    this.academicTypes$ = this.service.getAcademicStandingTypes();
  }

  save() {
    this.addTeachingInfo();
    //this.addHiringInfo();
  }

  addTeachingInfo() {
    const payload = {
      staffId: this.staffId,
      teachingLevel: JSON.stringify(this.form.controls.teachingLevel.value),
      teachingSubjects: JSON.stringify(
        this.form.controls.teachingSubjects.value
      ),
      teachingSubjectOther: '2',
    };
    this.teachingInfoService.addTeachingInfo(payload).subscribe((res) => {
      console.log('add teaching info result = ', res);
    });
  }

  addHiringInfo() {
    const payload = {
      staffId: this.staffId,
      psersonType: '2',
      position: '3',
      academicStanding: '4',
      startDate: '2022-08-22T10:17:01',
      endDate: '2022-08-22T10:17:01',
      hiringStatus: '5',
      hiringStatusDate: '2022-08-22T10:17:01',
      hiringStatusReason: '7',
      hiringContractNo: '8',
      hiringPeriodYear: '9',
      hiringPeriodMonth: '10',
    };
    this.teachingInfoService.addHiringInfo(payload).subscribe((res) => {
      console.log('add hiring info result = ', res);
    });
  }

  /*   save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการบันทึกข้อมูล
        ใช่หรือไม่? `,
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.onCompleted();
      }
    });
  } */

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
        buttonLabel: 'กลับสู่หน้าหลัก',
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.router.navigate(['/', 'staff-management']);
      }
    });
  }

  backPage() {
    this.router.navigate([
      '/staff-management',
      'staff-person-info',
      this.staffId,
    ]);
  }

  cancel() {
    this.router.navigate(['/staff-management']);
  }
}

export const levels = [
  { label: 'ประกาศนียบัตรวิชาชีพ (ปวช.)', name: 'level6' },
  { label: 'ชั้นมัธยมปีที่ 1-3', name: 'level4' },
  { label: 'ชั้นประถมปีที่ 1-3', name: 'level2' },
  { label: 'อนุบาล', name: 'level1' },
  {
    label: 'ประกาศนียบัตรวิชาชีพขั้นสูง (ปวส.) / อนุปริญญา',
    name: 'level7',
  },
  { label: 'ชั้นมัธยมปีที่ 4-6', name: 'level5' },
  { label: 'ชั้นประถมปีที่ 4-6', name: 'level3' },
];

export const subjects = [
  { label: 'ภาษาไทย', name: 's1' },
  { label: 'วิทยาศาสตร์', name: 's6' },
  { label: 'คณิตศาสตร์', name: 's12' },
  { label: 'ภาษาต่างประเทศ', name: 's2' },
  { label: 'ปฐมวัย', name: 's7' },
  { label: 'เทคโนโลยีสารสนเทศและการสื่อสาร', name: 's13' },
  { label: 'สุขศึกษาและพละศึกษา', name: 's3' },
  { label: 'คหกรรม', name: 's8' },
  { label: 'พาณิชยกรรม/บริหารธุรกิจ', name: 's14' },
  { label: 'สังคมศึกษา ศาสนาและวัฒนธรรม', name: 's4' },
  { label: 'ศิลปกรรม', name: 's9' },
  { label: 'อุตสาหกรรม', name: 's15' },
  { label: 'การงานอาชีพและเทคโนโลยี', name: 's5' },
  { label: 'เกษตรกรรม', name: 's10' },
  { label: 'อุตสาหกรรมสิ่งทอ', name: 's16' },
  { label: 'อื่นๆ', name: 's18' },
  { label: 'ประมง', name: 's11' },
  { label: 'อุตสาหกรรมท่องเที่ยว', name: 's17' },
];

export const status = [
  { label: 'แจ้งเข้า', name: 'status', value: 1 },
  { label: 'แจ้งออก', name: 'status', value: 2 },
  { label: 'ยกเลิกข้อมูล', name: 'status', value: 3 },
];
