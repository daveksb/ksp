import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { DynamicComponentDirective } from '@ksp/shared/directive';
import {
  DynamicComponent,
  KspFormBaseComponent,
  ListData,
} from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import _ from 'lodash';
import { debounceTime, lastValueFrom, skip } from 'rxjs';
import { DegreeCertStepOneService } from './step-one.service';

@UntilDestroy()
@Component({
  selector: 'ksp-degree-cert-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css'],
  providers: providerFactory(DegreeCertStepOneComponent),
})
export class DegreeCertStepOneComponent
  extends KspFormBaseComponent
  implements OnInit
{
  courseTypes: ListData[] = [];
  degreeTypes: ListData[] = [];
  universityTypes: ListData[] = [];
  provinces: ListData[] = [];
  @Input() showEditCheckbox = false;
  @Input() disabledInstitute = false;

  @Input() showCoordinatorForm = true;
  @Output() degreeType = new EventEmitter<string>();
  @ViewChild(DynamicComponentDirective, { static: true })
  myHost!: DynamicComponentDirective;

  override form = this.fb.group({
    institutionsGroup: [],
    institutionsCode: [],
    institutionsName: [],
    provience: [],
    degreeType: [],
    degreeTypeForm: [],
    courseType: [null],
    courseTypeForm: [],
    locations: this.fb.array([]),
    institutions: this.fb.array([]),
    locations2: this.fb.array([]),
    coordinator: [],
    courseDetailType: [],
    courseDetail: [],
    section1: [false],
    section2: [false],
    section3: [false],
    section4: [false],
    section5: [false],
    section6: [false],
  });
  step1Incorrect = null;
  // step1Incorrect = [
  //   'ไม่ครบถ้วน และไม่ถูกต้อง',
  //   'หมายเหตุ ข้อมูลมคอ. 2 ไม่ถูกต้อง',
  // ];

  constructor(
    private fb: FormBuilder,
    private service: DegreeCertStepOneService
  ) {
    super();
    this.gatAll();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
  override writeValue(value: any) {
    if (value) {
      this.value = value;
      if (value?.locations?.length) {
        this.loadData(this.locations, value?.locations);
      }
      if (value?.institutions?.length) {
        this.loadData(this.institutions, value?.institutions);
      }
      if (value?.locations2?.length) {
        this.loadData(this.locations2, value?.locations2);
      }
    }

    if (value === null) {
      this.form.reset();
    }
  }

  loadData(form: any, value: any) {
    _.forEach(value, (value: any, index: any) => {
      if (form?.controls[index]) {
        form?.controls[index]?.patchValue(value);
      } else {
        this.addFormArray(form);
        form?.controls[index].patchValue(value);
      }
    });
  }

  ngOnInit(): void {
    this.listenFormChange();
    this.setDefaulFormValue();
  }
  async gatAll() {
    const [universityTypes, provinces, degreeTypes, courseTypes] =
      await Promise.all([
        lastValueFrom(this.service.getUniversityType()),
        lastValueFrom(this.service.getProvince()),
        lastValueFrom(this.service.getUniDegreelevel()),
        lastValueFrom(this.service.getUniCourseType()),
      ]);
    this.universityTypes = universityTypes;
    this.provinces = provinces;
    this.courseTypes = courseTypes;
    this.degreeTypes = degreeTypes;
  }
  setDefaulFormValue() {
    this.addFormArray(this.locations);
    this.addFormArray(this.institutions);
    this.addFormArray(this.locations2);
  }

  listenFormChange() {
    this.form.valueChanges
      .pipe(untilDestroyed(this), debounceTime(750))
      .subscribe((res) => {
        //console.log('form value = ', res);
      });
  }
  get courseDetailType() {
    return this.form.controls.courseDetailType.value;
  }
  onDegreeTypeChanged(degreeType: string) {
    this.degreeType.emit(degreeType);
  }

  addFormArray(form: FormArray<any>, value = { title: [''] }) {
    const data = this.fb.group(value);
    form.push(data);
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  get locations() {
    return this.form.controls['locations'] as FormArray;
  }

  get institutions() {
    return this.form.controls['institutions'] as FormArray;
  }

  get locations2() {
    return this.form.controls['locations2'] as FormArray;
  }
  get section1() {
    return (
      !!(!this.form.controls?.section1?.value && this.showEditCheckbox) ||
      this.mode === 'view'
    );
  }
  get section2() {
    return (
      !!(!this.form.controls?.section2?.value && this.showEditCheckbox) ||
      this.mode === 'view'
    );
  }
  get section3() {
    return (
      !!(!this.form.controls?.section3?.value && this.showEditCheckbox) ||
      this.mode === 'view'
    );
  }
  get section4() {
    return (
      !!(!this.form.controls?.section4?.value && this.showEditCheckbox) ||
      this.mode === 'view'
    );
  }
  get section5() {
    return (
      !!(!this.form.controls?.section5?.value && this.showEditCheckbox) ||
      this.mode === 'view'
    );
  }
  get section6() {
    return (
      !!(!this.form.controls?.section6?.value && this.showEditCheckbox) ||
      this.mode === 'view'
    );
  }
}
