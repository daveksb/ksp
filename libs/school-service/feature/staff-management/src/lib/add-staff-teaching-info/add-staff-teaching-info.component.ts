import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  CompleteDialogComponent,
  ConfirmDialogComponent,
} from '@ksp/shared/ui/dialog';

@Component({
  selector: 'school-service-add-staff-teaching-info',
  templateUrl: './add-staff-teaching-info.component.html',
  styleUrls: ['./add-staff-teaching-info.component.scss'],
})
export class AddStaffTeachingInfoComponent implements OnInit {
  levelFormGroup: FormGroup;
  subjectFormGroup: FormGroup;

  levels = {
    ['อนุบาล']: false,
    ['ชั้นประถมปีที่ 1-3']: false,
    ['ชั้นประถมปีที่ 4-6']: false,
    ['ชั้นมัธยมปีที่ 1-3']: false,
    ['ชั้นมัธยมปีที่ 4-6']: false,
  };

  subjects = {
    ['ภาษาไทย']: false,
    ['วิทยาศาสตร์']: false,
    ['คณิตศาสตร์']: false,
    ['ภาษาต่างประเทศ']: false,
    ['ปฐมวัย']: false,
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.levelFormGroup = this.fb.group(this.levels);
    this.subjectFormGroup = this.fb.group(this.subjects);
  }

  ngOnInit(): void {
    this.levelFormGroup.valueChanges.subscribe((res) => {
      console.log('res = ', res);
    });
  }

  back() {
    this.router.navigate(['./', 'staff-management', 'staff-person-info']);
  }

  cancel() {
    this.router.navigate(['./', 'staff-management']);
  }

  save() {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      height: '175px',
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
  }

  onCompleted() {
    const completeDialog = this.dialog.open(CompleteDialogComponent, {
      height: '200px',
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
}
