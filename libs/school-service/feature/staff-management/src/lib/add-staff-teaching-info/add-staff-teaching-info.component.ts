import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { levels, subjects } from '@ksp/shared/constant';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/dialog';
import { StaffService } from '@ksp/shared/service';
import { formatCheckboxData } from '@ksp/shared/utility';
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
    psersonType: [],
    position: [],
    academicStanding: [],
    startDate: [],
    endDate: [],

    hiringStatus: [], //radio
    hiringStatusDate: [],
    hiringStatusReason: [],

    teachingLevel: this.fb.array([]),
    teachingSubjects: this.fb.array([]),
    teachingSubjectOther: [],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private service: StaffService,
    private activatedroute: ActivatedRoute,
    private teachingInfoService: StaffTeachingInfoService,
    private snackBar: MatSnackBar
  ) {
    this.addCheckboxes();
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((params) => {
      this.staffId = Number(params.get('id'));

      // edit mode
      if (this.staffId) {
        this.loadTeachingInfo(this.staffId);
        this.teachingInfoService
          .getHiringInfo(this.staffId)
          .subscribe((res) => {
            if (res.returnCode !== '98') {
              const {
                teachingLevel,
                teachingSubjects,
                teachingSubjectOther,
                ...formData
              } = res;
              formData.startDate = formData.startDate.split('T')[0];
              formData.endDate = formData.endDate.split('T')[0];
              formData.hiringStatusDate =
                formData.hiringStatusDate.split('T')[0];
              //console.log('kk = ', res);
              this.form.patchValue(formData);
            }
          });
      }
    });

    this.getList();
  }

  save() {
    this.addTeachingInfo();
    this.addHiringInfo();
  }

  loadTeachingInfo(staffId: number) {
    this.teachingInfoService.getTeachingInfo(staffId).subscribe((res) => {
      //console.log('loaded teaching info = ', res);

      if (res.returnCode !== '98') {
        const data = {
          ...res,
          teachingLevel: JSON.parse(atob(res.teachingLevel)),
          teachingSubjects: JSON.parse(atob(res.teachingSubjects)),
        };
        //console.log('loaded teaching info  = ', data);

        levels.map((level, i) => {
          const hasValue = data.teachingLevel.includes(level.value);
          this.teachingLevelFormArray.controls[i].patchValue(hasValue);
        });

        subjects.map((subject, i) => {
          const hasValue = data.teachingSubjects.includes(subject.value);
          this.teachingSubjectsFormArray.controls[i].patchValue(hasValue);
        });
      }

      /*  this.form.controls.teachingLevel.setValue(data);
      this.form.controls.teachingSubjects.setValue(data); */
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

  addTeachingInfo() {
    const payload = {
      staffId: this.staffId,
      teachingLevel: formatCheckboxData(
        this.form.controls.teachingLevel.value,
        levels
      ),
      teachingSubjects: formatCheckboxData(
        this.form.controls.teachingSubjects.value,
        subjects
      ),
      teachingSubjectOther: this.form.controls.teachingSubjectOther.value,
    };
    //console.log('payload = ', payload);
    this.teachingInfoService.addTeachingInfo(payload).subscribe((res) => {
      //console.log('add teaching info result = ', res);
    });
  }

  addHiringInfo() {
    const payload = {
      staffId: this.staffId,
      psersonType: this.form.controls.psersonType.value,
      position: this.form.controls.position.value,
      academicStanding: this.form.controls.academicStanding.value,
      startDate: this.form.controls.startDate.value,
      endDate: this.form.controls.endDate.value,
      hiringStatus: this.form.controls.hiringStatus.value,
      hiringStatusDate: this.form.controls.hiringStatusDate.value,
      hiringStatusReason: this.form.controls.hiringStatusReason.value,
      /*  hiringContractNo: '8',
      hiringPeriodYear: '9',
      hiringPeriodMonth: '10', */
    };

    this.teachingInfoService.addHiringInfo(payload).subscribe((res) => {
      //console.log('add hiring info result = ', res);
    });
  }

  onConfirmed() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: `คุณต้องการยืนยันข้อมูลใช่หรือไม่? `,
        btnLabel: 'บันทึก',
      },
    });

    confirmDialog.componentInstance.confirmed.subscribe((res) => {
      if (res) {
        this.save();
        this.onCompleted();
      }
    });
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      width: '350px',
      data: {
        header: `บันทึกข้อมูลสำเร็จ`,
      },
    });

    completeDialog.componentInstance.completed.subscribe((res) => {
      if (res) {
        this.cancel();
      }
    });
  }

  prevPage() {
    this.router.navigate(['/staff-management', 'edit-staff', this.staffId]);
  }

  cancel() {
    this.router.navigate(['/staff-management', 'list']);
  }
}

export const status = [
  { label: 'แจ้งเข้า', value: '1' },
  { label: 'แจ้งออก', value: '2' },
  { label: 'ยกเลิกข้อมูล', value: '3' },
];
