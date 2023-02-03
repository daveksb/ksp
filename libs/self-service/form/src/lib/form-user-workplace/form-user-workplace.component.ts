import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  Amphur,
  Bureau,
  KspFormBaseComponent,
  Province,
  SchInfo,
  Tambol,
} from '@ksp/shared/interface';
import { UniversitySearchComponent } from '@ksp/shared/search';
import { AddressService } from '@ksp/shared/service';
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
  @Input() showOnlineForm = false;
  @Input() isDarkMode = false;
  @Input() provinces: Province[] | null = [];
  @Input() amphurs: Amphur[] | null = [];
  @Input() tumbols: Tambol[] | null = [];
  @Input() bureaus: Bureau[] | null = [];
  @Input() showNotRequire = false;
  @Output() provinceChanged = new EventEmitter<any>();
  @Output() amphurChanged = new EventEmitter<any>();

  schoolInfo = new SchInfo();
  school: any;
  schoolName: any;
  moo: any;
  road: any;
  zipcode: any;
  houseNo: any;
  alley: any;
  bureauid: any;
  province: any;
  amphur: any;
  tumbon: any;
  phone: any;
  fax: any;
  email: any;
  website: any;

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

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private addressService: AddressService
  ) {
    super();
    this.subscriptions.push(
      this.form?.valueChanges.subscribe((value) => {
        //console.log(value);
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    if (this.mode !== 'view') {
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
  }

  selectedUniversity(school: SchInfo) {
    this.schoolInfo = school;
    //console.log('activeUsers = ', school);
    this.bureauid = school.bureauid;
    this.schoolName = school.schoolname;
    this.zipcode = school.zipcode;
    this.moo = school.moo;
    this.houseNo = school.address;
    this.alley = school.street;
    this.road = school.road;
    this.province = school.provinceid;
    if (this.province) {
      this.amphur = school.amphurid;
    }
    if (this.tumbon) {
      this.tumbon = school.tumbonid;
    }
    this.phone = school.telphone;
    this.fax = school.fax;
    this.email = school.schsendemail;
    this.website = school.web;

    this.patchData();
  }

  openSearchDialog() {
    const dialog = this.dialog.open(UniversitySearchComponent, {
      height: '100vh',
      width: '75vw',
      position: {
        top: '0px',
        right: '0px',
      },
      data: {
        searchType: 'school',
        subHeader: 'กรุณาเลือกหน่วยงาน/สถานศึกษาที่ท่านสังกัด',
        bureauList: this.bureaus,
      },
    });

    dialog.afterClosed().subscribe((res: SchInfo) => {
      if (res) {
        this.selectedUniversity(res);
      }
    });
  }

  patchData() {
    this.form.controls.bureauid.patchValue(this.bureauid);
    this.form.controls.schoolname.patchValue(this.schoolName);
    this.form.controls.houseno.patchValue(this.houseNo);
    this.form.controls.moo.patchValue(this.moo);
    this.form.controls.postcode.patchValue(this.zipcode);
    this.form.controls.road.patchValue(this.road);
    this.form.controls.alley.patchValue(this.alley);
    this.form.controls.province.patchValue(this.province);
    if (this.province) {
      this.addressService.getAmphurs(this.province).subscribe((res) => {
        this.amphurs = res;
        this.form.controls.amphur.patchValue(this.amphur);
      });
    }
    if (this.amphur) {
      this.addressService.getTumbols(this.amphur).subscribe((res) => {
        this.tumbols = res;
        this.form.controls.tumbol.patchValue(this.tumbon);
      });
    }
    this.form.controls.phone.patchValue(this.phone);
    this.form.controls.fax.patchValue(this.fax);
    this.form.controls.email.patchValue(this.email);
    this.form.controls.website.patchValue(this.website);
  }

  updatePostcode(evt: any) {
    const tumbolCode = evt.target?.value;
    if (this.tumbols && this.tumbols.length) {
      const postCode: any = this.tumbols.find(
        (t) => t.tambolCode === tumbolCode
      );
      this.form.controls.postcode.patchValue(postCode.tambolPostcode);
    }
  }
}
