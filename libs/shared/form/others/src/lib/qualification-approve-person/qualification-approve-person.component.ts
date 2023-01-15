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
import { GeneralInfoService, SchoolInfoService } from '@ksp/shared/service';
import { Observable } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { getCookie } from '@ksp/shared/utility';

@UntilDestroy()
@Component({
  selector: 'ksp-qualification-approve-person',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './qualification-approve-person.component.html',
  styleUrls: ['./qualification-approve-person.component.scss'],
})
export class QualificationApprovePersonComponent
  extends KspFormBaseComponent
  implements OnInit
{
  prefixList$!: Observable<any>;
  @Input() set input(value: any) {
    //console.log(value);
    if (value) this.form.patchValue(value);
  }
  schoolid = getCookie('schoolId');
  @Output() completed = new EventEmitter<boolean>();
  override form = this.fb.group({
    prefixth1: [null],
    firstnameth1: [null],
    lastnameth1: [null],
    position1: [null],
    prefixth2: [null],
    firstnameth2: [null],
    lastnameth2: [null],
    position2: [null],
  });

  constructor(
    public dialogRef: MatDialogRef<QualificationApprovePersonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private generalInfoService: GeneralInfoService,
    private fb: FormBuilder,
    private schoolInfoService: SchoolInfoService
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
    const mode = this.data.mode;
    if (mode == 'view')
      setTimeout(() => {
        this.form.patchValue(this.data.refperson);
        this.form.disable();
      }, 0);
    this.getList();
    this.getSchoolManager();
  }

  getSchoolManager() {
    const payload = {
      schoolid: this.schoolid,
    };
    this.schoolInfoService
      .getSchoolInfo(payload)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        //console.log('managerinfo = ', res);
        if (res) {
          const manager: any = {
            ...res,
            prefixth2: res.thprefixid,
            position2: res.thposition,
            firstnameth2: res.thname,
            lastnameth2: res.thfamilyname,
          };
          this.form.patchValue(manager);
        }
      });
  }

  getList() {
    this.prefixList$ = this.generalInfoService.getPrefix();
  }

  save() {
    this.dialogRef.close({ refperson: this.form.value });
  }
}
