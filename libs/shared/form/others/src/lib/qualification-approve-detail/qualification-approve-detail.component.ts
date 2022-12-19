import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'ksp-qualification-approve-detail',
  standalone: true,
  templateUrl: './qualification-approve-detail.component.html',
  styleUrls: ['./qualification-approve-detail.component.scss'],
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
})
export class QualificationApproveDetailComponent
  extends KspFormBaseComponent
  implements OnInit
{
  degreeLevelName = '';
  degreeName = '';
  institution = '';
  major = '';
  degreelevelMapping = new Map([
    ['1', 'ปริญญาตรี'],
    ['2', 'ปริญญาโท'],
    ['3', 'ปริญญาเอก'],
    ['4', 'วุฒิการศึกษาปริญญาอื่นๆที่เทียบเท่าปริญญาตรี / ปริญญาทางการศึกษา'],
  ]);

  override form = this.fb.group({
    degree: ['', Validators.required],
    reason1: [],
    reason2: [],
  });
  @Input() set input(value: any) {
    //console.log(value);
    if (value) this.form.patchValue(value);
  }
  @Output() confirmed = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<QualificationApproveDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        // console.log(value);
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    const education = this.data.education;
    const mode = this.data.mode;
    if (mode == 'view')
      setTimeout(() => {
        this.form.patchValue(this.data.otherreason);
        this.form.disable();
      }, 0);
    this.institution = education?.institution ?? '';
    this.degreeName = education?.degreeName ?? '';
    this.major = education?.major ?? '';
    this.degreeLevelName =
      this.degreelevelMapping.get(education?.degreeLevelName) ??
      'วุฒิการศึกษาปริญญาตรี';
  }
  save() {
    this.dialogRef.close({ otherreason: this.form.value });
  }
}
