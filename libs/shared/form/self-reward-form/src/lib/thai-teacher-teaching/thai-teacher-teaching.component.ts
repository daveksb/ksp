import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { FormBuilder, Validators } from '@angular/forms';

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

  override form = this.fb.group({
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
    workTitle: ['', Validators.required],
  });

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

  ngOnInit(): void {}

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
