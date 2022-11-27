import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CommonModule } from '@angular/common';
@UntilDestroy()
@Component({
  templateUrl: './forbidden-property.component.html',
  selector: 'ksp-forbidden-property',
  styleUrls: ['./forbidden-property.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FileUploadComponent,
    ReactiveFormsModule,
  ],
})
export class ForbiddenPropertyFormComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input()
  title = `ขอรับรองว่าไม่เป็นผู้มีลักษณะต้องห้ามตามที่กำหนดไว้ในมาตรา 44
  แห่งพระราชบัญญัติสภาครูและบุคลากรทางการศึกษา พ.ศ.2546`;

  @Input() set input(value: any) {
    console.log(value);
    if (value) this.form.patchValue(value);
  }
  @Output() confirmed = new EventEmitter<any>();

  override form = this.fb.group({
    immoral: [null, Validators.required],
    incompetent: [null, Validators.required],
    prison: [null, Validators.required],
    prisonReason: [null],
    fileid: [null],
    filename: [null],
  });

  get filename() {
    return this.form.controls.filename.value || '';
  }

  get fileid() {
    return this.form.controls.fileid.value || '';
  }

  prisonSelected: any;

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
        // console.log(value);
        this.onChange(value);
        this.onTouched();
      })
    );

    if (this.data?.prohibitProperty) {
      this.form.patchValue(this.data.prohibitProperty);
    }
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((res) => {
      this.prisonSelected = Number(res['prison']);
    });
  }

  uploadComplete(evt: any) {
    console.log('upload result = ', evt);
    const fileInfo: any = evt;
    this.form.patchValue(fileInfo);
    console.log('this.form.value = ', this.form.value);
  }

  save() {
    this.confirmed.emit(this.form.getRawValue());
  }
}
