import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'ksp-edit-license',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-license.component.html',
  styleUrls: ['./edit-license.component.scss'],
  providers: providerFactory(EditLicenseComponent),
})
export class EditLicenseComponent
  extends KspFormBaseComponent
  implements OnInit
{
  override form = this.fb.group({
    prefixTh: [],
    prefixEn: [],
    nameTh: [],
    nameEn: [],
    lastnameTh: [],
    lastnameEn: [],
    passport: [],
    distributeData: [],
  });

  @Input() showEditPassport = false;
  @Input() showDistributeData = false;

  constructor(private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    this.form.disable();
    /*  this.form.valueChanges.pipe(untilDestroyed(this)).subscribe((res) => {
      //
    }); */
  }

  disableControl(evt: any, controlList: controlName[]) {
    const checked = evt.target.checked;
    controlList.forEach((i) => {
      if (checked) {
        this.form.controls[i].enable();
      } else {
        this.form.controls[i].disable();
      }
    });
  }
}

export type controlName =
  | 'prefixTh'
  | 'prefixEn'
  | 'nameTh'
  | 'nameEn'
  | 'lastnameTh'
  | 'lastnameEn'
  | 'passport'
  | 'distributeData';
