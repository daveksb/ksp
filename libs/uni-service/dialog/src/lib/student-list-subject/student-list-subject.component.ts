import { Component, Inject, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { providerFactory } from '@ksp/shared/utility';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@UntilDestroy()
@Component({
  selector: 'ksp-student-list-subject',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './student-list-subject.component.html',
  styleUrls: ['./student-list-subject.component.scss'],
  providers: providerFactory(StudentListSubjectComponent),
})
export class StudentListSubjectComponent {
  subjectData: any;
  disabledField = false;
  constructor(
    private fb: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<StudentListSubjectComponent>
  ) {
    if (this.data) {
      this.subjectData = this.data;
      if (this.data.disableAll) {
        this.disabledField = true;
      }
    }
  }

  save() {
    this.dialogRef.close(this.subjectData);
  }
}
