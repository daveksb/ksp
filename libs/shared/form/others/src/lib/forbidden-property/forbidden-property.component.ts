import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  templateUrl: './forbidden-property.component.html',
  styleUrls: ['./forbidden-property.component.scss'],
  standalone: true,
  imports: [MatDialogModule, FileUploadComponent, ReactiveFormsModule],
})
export class ForbiddenPropertyFormComponent extends KspFormBaseComponent {
  @Input()
  title = `ขอรับรองว่าไม่เป็นผู้มีลักษณะต้องห้ามตามที่กำหนดไว้ในมาตรา 44
  แห่งพระราชบัญญัติสภาครูและบุคลากรทางการศึกษา พ.ศ.2546`;
  @Output() confirmed = new EventEmitter<any>();

  override form = this.fb.group({
    immoral: [null, Validators.required],
    incompetent: [null, Validators.required],
    prison: [null, Validators.required],
    prisonReason: [],
    fileId: [null],
    fileName: [null],
  });

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      prohibitProperty: any;
      uniqueTimeStamp: string;
    }
  ) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );

    if (this.data?.prohibitProperty) {
      this.form.patchValue(this.data.prohibitProperty);
    }
  }

  uploadComplete(evt: any) {
    //console.log('upload result = ', evt);
    const fileInfo: any = evt;
    this.form.patchValue(fileInfo);
    //console.log('this.form.value = ', this.form.value);
  }

  save() {
    this.confirmed.emit(this.form.getRawValue());
  }
}
