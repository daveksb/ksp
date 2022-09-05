import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    level1: [false],
    level2: [false],
    level3: [false],
    level4: [false],
    level5: [false],
    level6: [false],
    level7: [false],
    status: [],
    statusDate: [],
    subject1: [false],
    subject2: [false],
    subject3: [false],
    subject4: [false],
    subject5: [false],
    subject6: [false],
    subject7: [false],
    subject8: [false],
    subject9: [false],
    subject10: [false],
    subject11: [false],
    subject12: [false],
    subject13: [false],
    subject14: [false],
    subject15: [false],
    subject16: [false],
    subject17: [false],
    subject18: [false],
    other: [],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private service: StaffPersonInfoService,
    private activatedroute: ActivatedRoute,
    private teachingInfoService: StaffTeachingInfoService
  ) {}

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params) => {
      this.staffId = Number(params.get('id'));
    });

    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((res) => {
      //console.log('res = ', res);
    });

    this.getList();
  }

  getList() {
    this.staffTypes$ = this.service.getStaffTypes();
    this.positionTypes$ = this.service.getPositionTypes();
    this.academicTypes$ = this.service.getAcademicStandingTypes();
  }

  save() {
    this.addTeachingInfo();
    this.addHiringInfo();
  }

  addTeachingInfo() {
    const payload = {
      staffId: '10',
      teachingLevel:
        "{'field1':'data1','field2':'data2','field3':['thai','english','math']}",
      teachingSubjects: "{'field1':'data1','field2':'data2','field3':'data3'}",
      teachingSubjectOther: '2',
    };

    this.teachingInfoService.addTeachingInfo(payload).subscribe((res) => {
      console.log('add teaching info result = ', res);
    });
  }

  addHiringInfo() {
    const payload = {
      staffId: '10',
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
  { label: 'ประกาศนียบัตรวิชาชีพ (ปวช.)', name: 'level6', value: false },
  { label: 'ชั้นมัธยมปีที่ 1-3', name: 'level4', value: false },
  { label: 'ชั้นประถมปีที่ 1-3', name: 'level2', value: false },
  { label: 'อนุบาล', name: 'level1', value: false },
  {
    label: 'ประกาศนียบัตรวิชาชีพขั้นสูง (ปวส.) / อนุปริญญา',
    name: 'level7',
    value: false,
  },
  { label: 'ชั้นมัธยมปีที่ 4-6', name: 'level5', value: false },
  { label: 'ชั้นประถมปีที่ 4-6', name: 'level3', value: false },
];

export const subjects = [
  { label: 'ภาษาไทย', name: 'subject1', value: false },
  { label: 'วิทยาศาสตร์', name: 'subject6', value: false },
  { label: 'คณิตศาสตร์', name: 'subject12', value: false },
  { label: 'ภาษาต่างประเทศ', name: 'subject2', value: false },
  { label: 'ปฐมวัย', name: 'subject7', value: false },
  { label: 'เทคโนโลยีสารสนเทศและการสื่อสาร', name: 'subject13', value: false },
  { label: 'สุขศึกษาและพละศึกษา', name: 'subject3', value: false },
  { label: 'คหกรรม', name: 'subject8', value: false },
  { label: 'พาณิชยกรรม/บริหารธุรกิจ', name: 'subject14', value: false },
  { label: 'สังคมศึกษา ศาสนาและวัฒนธรรม', name: 'subject4', value: false },
  { label: 'ศิลปกรรม', name: 'subject9', value: false },
  { label: 'อุตสาหกรรม', name: 'subject15', value: false },
  { label: 'การงานอาชีพและเทคโนโลยี', name: 'subject5', value: false },
  { label: 'เกษตรกรรม', name: 'subject10', value: false },
  { label: 'อุตสาหกรรมสิ่งทอ', name: 'subject16', value: false },
  { label: 'อื่นๆ', name: 'subject18', value: false },
  { label: 'ประมง', name: 'subject11', value: false },
  { label: 'อุตสาหกรรมท่องเที่ยว', name: 'subject17', value: false },
];

export const status = [
  { label: 'แจ้งเข้า', name: 'status', value: 1 },
  { label: 'แจ้งออก', name: 'status', value: 2 },
  { label: 'ยกเลิกข้อมูล', name: 'status', value: 3 },
];
