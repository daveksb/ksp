import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { UniversitySearchComponent } from '@ksp/shared/search';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { pairwise } from 'rxjs/operators';

const formList = [
  'bureauid',
  'schoolname',
  'houseno',
  'moo',
  'alley',
  'road',
  'postcode',
  'province',
  'tumbol',
  'amphur',

  'phone',
  'fax',
  'email',
  'website',
];

@UntilDestroy()
@Component({
  selector: 'self-service-form-user-workplace',
  templateUrl: './form-user-workplace.component.html',
  styleUrls: ['./form-user-workplace.component.css'],
  providers: providerFactory(FormUserWorkplaceComponent),
})
export class FormUserWorkplaceComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input() showContactForm = false;
  @Input() isDarkMode = false;
  @Input() provinces: any[] = [];
  @Input() amphurs: any[] = [];
  @Input() tumbols: any[] = [];
  @Input() bureaus: any[] = [];
  @Input() showNotRequire = false;
  @Output() provinceChanged = new EventEmitter<any>();
  @Output() amphurChanged = new EventEmitter<any>();

  override form = this.fb.group({
    bureauid: [null, Validators.required],
    schoolname: [null, Validators.required],
    houseno: [null, Validators.required],
    moo: [null],
    alley: [null],
    road: [null],
    postcode: [null, Validators.required],
    province: [null, Validators.required],
    tumbol: [null, Validators.required],
    amphur: [null, Validators.required],
    notRequired: [false],

    phone: [],
    fax: [],
    email: [],
    website: [],
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

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(untilDestroyed(this), pairwise())
      .subscribe(([prev, next]) => {
        if (prev.notRequired !== next.notRequired) {
          formList.forEach((form) => {
            if (!next.notRequired) {
              this.form.get(form)?.addValidators(Validators.required);
              this.form.get(form)?.enable();
            } else {
              this.form.get(form)?.clearValidators();
              this.form.get(form)?.disable();
              this.form.get(form)?.reset();
            }
            this.form.get(form)?.updateValueAndValidity();
          });
        }
      });
  }

  openSearchDialog() {
    this.dialog.open(UniversitySearchComponent, {
      height: '100vh',
      width: '75vw',
      position: {
        top: '0px',
        right: '0px',
      },

      data: {
        searchType: 'string',
        subHeader: 'กรุณาเลือกหน่วยงาน/สถานศึกษาที่ท่านสังกัด',
        bureauList: 'string',
      },
    });
  }

  updatePostcode(evt: any) {
    const tumbolCode = evt.target?.value;
    const postCode = this.tumbols.find((t) => t.tambolCode === tumbolCode);
    this.form.controls.postcode.patchValue(postCode.tambolPostcode);
  }
}
