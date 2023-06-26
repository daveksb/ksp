import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { KspFormBaseComponent, University } from '@ksp/shared/interface';
import { SchoolLicenseService } from '@ksp/shared/service';

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
  implements OnInit, AfterViewInit
{
  institutname     = '';
  degreeLevelName  = '';
  degreelevelMapping = new Map([
    ['1', 'ปริญญาตรี'],
    ['2', 'ปริญญาโท'],
    ['3', 'ปริญญาเอก'],
    ['4', 'วุฒิการศึกษาปริญญาอื่นๆที่เทียบเท่าปริญญาตรี / ปริญญาทางการศึกษา'],
  ]);
  universityList$!: Observable<University[]>;

  override form = this.fb.group({
    degree: [null, Validators.required],
    degreename: [],
    major: [],
    institute: new FormControl(''),
    reason1: [],
    reason2: [],
  });

  @Input() set otherReason(value: any) {
    console.log('value = ', value);
    if (value) this.form.patchValue(value);
  }

  @Output() confirmed = new EventEmitter<boolean>();

  constructor(
    private changedetector: ChangeDetectorRef,
    private licenseService: SchoolLicenseService,
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
    const education     = this.data.education;
    const mode          = this.data.mode;

    const eduData: any  = {
      degree: true,
      major: this.data?.education?.major,
      institute: education.institution,
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

  ngAfterViewInit(): void {
    this.getInstitute(this.data.education?.institution);
    this.changedetector.detectChanges();
  }

  save() {
    this.dialogRef.close({ otherreason: this.form.getRawValue() });
  }

  getInstitute(insdata: string)
  {
    try {
          const insconv = parseInt( insdata )
          if(isNaN(insconv) === false)
          {
            this.licenseService.getUniversityList().subscribe( res => {
              this.institutname = res[insconv].name ;
              this.form.get('institute')?.setValue(this.institutname);
            })
          }
    }catch(excp){ 
          console.log(excp); 
          this.form.get('institute')?.setValue(insdata);
    }
  }
}
