import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
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
    immoral: [],
    incompetent: [],
    prison: [],
    prisonReason: [],
  });

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      prohibitProperty: any;
    }
  ) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );

    if (this.data?.prohibitProperty) {
      this.form.patchValue(this.data.prohibitProperty);
    }
  }

  save() {
    this.confirmed.emit(this.form.getRawValue());
  }
}
