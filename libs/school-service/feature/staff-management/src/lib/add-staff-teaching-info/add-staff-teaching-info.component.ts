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
    statusDate: [],
    teachingLevel: this.fb.array([]),
    teachingSubjects: this.fb.array([]),
    teachingSubjectOther: [],
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

      // edit mode
      if (this.staffId) {
        this.loadTeachingInfo(this.staffId);
      }
    });

    /*     this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((res) => {
      console.log('form = ', res);
    }); */

    this.getList();
  }

  loadTeachingInfo(staffId: number) {
    this.teachingInfoService.getTeachingInfo(staffId).subscribe((res) => {
      //console.log('loaded teaching info = ', res);
      const data = {
        ...res,
        teachingLevel: JSON.parse(atob(res.teachingLevel)),
        teachingSubjects: JSON.parse(atob(res.teachingSubjects)),
      };
      console.log('loaded teaching info  = ', data);
    });
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

  // map json data for expected format for osb
  mapJsonData(input: any[], source: any[]) {
    const result = input
      .map((v, i) => (v ? source[i].value : null))
      .filter((v) => v !== null);
    //console.log('map data = ', result);
    return JSON.stringify(result);
  }

  addTeachingInfo() {
    const payload = {
      staffId: this.staffId,
      teachingLevel: this.mapJsonData(
        this.form.controls.teachingLevel.value,
        levels
      ),
      teachingSubjects: this.mapJsonData(
        this.form.controls.teachingSubjects.value,
        subjects
      ),
      teachingSubjectOther: this.form.controls.teachingSubjectOther.value,
    };

    console.log('payload = ', payload);
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
        this.router.navigate(['/staff-management']);
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
  { label: 'ประกาศนียบัตรวิชาชีพ (ปวช.)', value: 'level6' },
  { label: 'ชั้นมัธยมปีที่ 1-3', value: 'level4' },
  { label: 'ชั้นประถมปีที่ 1-3', value: 'level2' },
  { label: 'อนุบาล', value: 'level1' },
  {
    label: 'ประกาศนียบัตรวิชาชีพขั้นสูง (ปวส.) / อนุปริญญา',
    value: 'level7',
  },
  { label: 'ชั้นมัธยมปีที่ 4-6', value: 'level5' },
  { label: 'ชั้นประถมปีที่ 4-6', value: 'level3' },
];

export const subjects = [
  { label: 'ภาษาไทย', value: 's1' },
  { label: 'วิทยาศาสตร์', value: 's6' },
  { label: 'คณิตศาสตร์', value: 's12' },
  { label: 'ภาษาต่างประเทศ', value: 's2' },
  { label: 'ปฐมวัย', value: 's7' },
  { label: 'เทคโนโลยีสารสนเทศและการสื่อสาร', value: 's13' },
  { label: 'สุขศึกษาและพละศึกษา', value: 's3' },
  { label: 'คหกรรม', value: 's8' },
  { label: 'พาณิชยกรรม/บริหารธุรกิจ', value: 's14' },
  { label: 'สังคมศึกษา ศาสนาและวัฒนธรรม', value: 's4' },
  { label: 'ศิลปกรรม', value: 's9' },
  { label: 'อุตสาหกรรม', value: 's15' },
  { label: 'การงานอาชีพและเทคโนโลยี', value: 's5' },
  { label: 'เกษตรกรรม', value: 's10' },
  { label: 'อุตสาหกรรมสิ่งทอ', value: 's16' },
  { label: 'อื่นๆ', value: 's18' },
  { label: 'ประมง', value: 's11' },
  { label: 'อุตสาหกรรมท่องเที่ยว', value: 's17' },
];

export const status = [
  { label: 'แจ้งเข้า', value: 1 },
  { label: 'แจ้งออก', value: 2 },
  { label: 'ยกเลิกข้อมูล', value: 3 },
];
