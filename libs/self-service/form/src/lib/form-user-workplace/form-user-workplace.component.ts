import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { UniversitySearchComponent } from '@ksp/shared/search';
import { providerFactory } from '@ksp/shared/utility';

@Component({
  selector: 'self-service-form-user-workplace',
  templateUrl: './form-user-workplace.component.html',
  styleUrls: ['./form-user-workplace.component.css'],
  providers: providerFactory(FormUserWorkplaceComponent),
})
export class FormUserWorkplaceComponent extends KspFormBaseComponent {
  @Input() provinces: any[] = [];
  @Input() amphurs: any[] = [];
  @Input() tumbols: any[] = [];
  @Input() bureaus: any[] = [];
  @Output() provinceChanged = new EventEmitter<any>();
  @Output() amphurChanged = new EventEmitter<any>();

  override form = this.fb.group({
    bureauid: [null, Validators.required],
    schoolname: [null, Validators.required],
    houseno: [null, Validators.required],
    moo: [null],
    alley: [null],
    road: [null, Validators.required],
    postcode: [null, Validators.required],
    province: [null, Validators.required],
    tumbol: [null, Validators.required],
    amphur: [null, Validators.required],
  });

  constructor(private dialog: MatDialog, private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        //console.log(value);
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  openSearchDialog() {
    this.dialog.open(UniversitySearchComponent, {
      height: '900px',
      width: '1200px',
    });
  }

  updatePostcode(evt: any) {
    const tumbolCode = evt.target?.value;
    const postCode = this.tumbols.find((t) => t.tambolCode === tumbolCode);
    this.form.controls.postcode.patchValue(postCode.tambolPostcode);
  }
}
