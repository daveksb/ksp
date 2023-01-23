import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KspFormBaseComponent, SchInfo } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { UniversitySearchComponent } from '@ksp/shared/search';
import { MatDialog } from '@angular/material/dialog';
import { AddressService } from '@ksp/shared/service';

@Component({
  selector: 'ksp-thai-teacher-teaching',
  templateUrl: './thai-teacher-teaching.component.html',
  styleUrls: ['./thai-teacher-teaching.component.scss'],
  providers: providerFactory(ThaiTeacherTeachingComponent),
})
export class ThaiTeacherTeachingComponent
  extends KspFormBaseComponent
  implements OnInit
{
  @Input() bureaus: any[] = [];
  @Input() provinces: any[] = [];
  @Input() amphurs: any[] = [];
  @Input() tumbols: any[] = [];
  @Input() provinces2: any[] = [];
  @Input() amphurs2: any[] = [];
  @Input() tumbols2: any[] = [];
  @Output() provinceChanged = new EventEmitter<any>();
  @Output() amphurChanged = new EventEmitter<any>();
  @Output() province2Changed = new EventEmitter<any>();
  @Output() amphur2Changed = new EventEmitter<any>();
  @Output() sameAddress = new EventEmitter<any>();

  schoolInfo1 = new SchInfo();
  schoolInfo2 = new SchInfo();

  schoolName1: any;
  schoolName2: any;

  override form = this.fb.group({
    startTeachingDate: [null, Validators.required],
    position: ['', Validators.required],
    experienceYear: ['', Validators.required],

    youtubeLink: ['', Validators.required],

    affiliation: ['', Validators.required],
    teachingPlace: ['', Validators.required],
    province: ['', Validators.required],
    subDistrict: ['', Validators.required],
    district: ['', Validators.required],
    teachingLevel: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    currentAffiliation: ['', Validators.required],
    currentTeachingPlace: ['', Validators.required],
    currentProvince: ['', Validators.required],
    currentSubDistrict: ['', Validators.required],
    currentDistrict: ['', Validators.required],
    currentTeachingLevel: ['', Validators.required],
    phone: ['', Validators.required],
    fax: ['', Validators.required],
    continuousTeachingYear: ['', Validators.required],
    // workTitle: ['', Validators.required],

    promoteWorks: this.fb.array([]),
    askPositionWorks: this.fb.array([]),
    graduateWorks: this.fb.array([]),
  });

  get promoteWorks() {
    return this.form.controls['promoteWorks'] as FormArray;
  }

  get askPositionWorks() {
    return this.form.controls['askPositionWorks'] as FormArray;
  }

  get graduateWorks() {
    return this.form.controls['graduateWorks'] as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private addressService: AddressService
  ) {
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
    this.addFormArray(this.promoteWorks);
    this.addFormArray(this.askPositionWorks);
    this.addFormArray(this.graduateWorks);
  }

  override set value(value: any) {
    Object.keys(value).forEach((key) => {
      if (this.form.get(key) instanceof FormArray) {
        const control = this.form.get(key) as FormArray;
        if (value[key].length) {
          control.removeAt(0);
          value[key].forEach((item: any, index: number) => {
            this.addFormArray(control);
            control.at(index).patchValue(item);
          });
        }
      } else {
        this.form.get(key)?.patchValue(value[key]);
      }
    });

    if (value.province) {
      this.addressService.getAmphurs(value.province).subscribe((res) => {
        this.amphurs = res;
        this.form.controls.district.patchValue(value.district);
      });
    }
    if (value.district) {
      this.addressService.getTumbols(value.district).subscribe((res) => {
        this.tumbols = res;
        this.form.controls.subDistrict.patchValue(value.subDistrict);
      });
    }
    if (value.currentProvince) {
      this.addressService.getAmphurs(value.currentProvince).subscribe((res) => {
        this.amphurs2 = res;
        this.form.controls.currentDistrict.patchValue(value.currentDistrict);
      });
    }
    if (value.currentDistrict) {
      this.addressService.getTumbols(value.currentDistrict).subscribe((res) => {
        this.tumbols2 = res;
        this.form.controls.currentSubDistrict.patchValue(
          value.currentSubDistrict
        );
      });
    }

    if (this.mode === 'view') {
      this.form.disable();
    }

    this.onChange(value);
    this.onTouched();
  }

  addFormArray(form: FormArray<any>) {
    const data = this.fb.group({
      work: [null, Validators.required],
    });
    form.push(data);
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  selectedUniversity1(school: SchInfo) {
    this.schoolInfo1 = school;
    this.schoolName1 = school.schoolname;
    this.form.controls.teachingPlace.patchValue(this.schoolName1);
  }

  selectedUniversity2(school: SchInfo) {
    this.schoolInfo2 = school;
    this.schoolName2 = school.schoolname;
    this.form.controls.currentTeachingPlace.patchValue(this.schoolName2);
  }

  openSearchDialog1() {
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
        this.selectedUniversity1(res);
      }
    });
  }

  openSearchDialog2() {
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
        this.selectedUniversity2(res);
      }
    });
  }

  useSameAddress(evt: any) {
    const checked = evt.target.checked;
    if (checked) {
      this.sameAddress.emit();
      const {
        affiliation,
        teachingPlace,
        province,
        district,
        subDistrict,
        teachingLevel,
      } = this.form.value;
      this.form.patchValue({
        currentAffiliation: affiliation,
        currentTeachingPlace: teachingPlace,
        currentProvince: province,
        currentSubDistrict: subDistrict,
        currentDistrict: district,
        currentTeachingLevel: teachingLevel,
      });
    }
  }
}
