import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
  degreelevelMapping = new Map([
    ['1', 'ปริญญาตรี'],
    ['2', 'ปริญญาโท'],
    ['3', 'ปริญญาเอก'],
    ['4', 'วุฒิการศึกษาปริญญาอื่นๆที่เทียบเท่าปริญญาตรี / ปริญญาทางการศึกษา'],
  ]);

  override form = this.fb.group({
    degree: [null, Validators.required],
    degreename: [],
    major: [],
    institute: [],
    reason1: [],
    reason2: [],
  });

  @Input() set otherReason(value: any) {
    //console.log('value = ', value);
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
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    const education = this.data.education;
    const mode = this.data.mode;
    //console.log('data = ', this.data);

    const eduData: any = {
      degree: true,
      major: this.data?.education?.major,
      institute: this.data?.education?.institution,
      degreename: this.data?.education?.degreeName,
    };
    this.form.patchValue(eduData);

    if (mode == 'view') {
      setTimeout(() => {
        this.form.disable();
      }, 0);
    } else {
      this.form.controls.degreename.disable();
      this.form.controls.major.disable();
      this.form.controls.institute.disable();
    }

    this.degreeLevelName =
      this.degreelevelMapping.get(education?.degreeLevelName) ??
      'วุฒิการศึกษาปริญญาตรี';
  }

  save() {
    this.dialogRef.close({ otherreason: this.form.getRawValue() });
  }
}
