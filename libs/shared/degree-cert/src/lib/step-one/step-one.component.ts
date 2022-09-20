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
  });

  step1Incorrect = [
    'ไม่ครบถ้วน และไม่ถูกต้อง',
    'หมายเหตุ ข้อมูลมคอ. 2 ไม่ถูกต้อง',
  ];

  constructor(
    private fb: FormBuilder,
    private service: DegreeCertStepOneService
  ) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnInit(): void {
    this.gatAll();
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
    // const res = await lastValueFrom(this.service.searchNameUniUniversity(''));
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

    this.form.controls['courseType'].valueChanges
      .pipe(skip(1), untilDestroyed(this))
      .subscribe((res) => {
        this.loadComponent(Number(res));
      });
  }

  onDegreeTypeChanged(degreeType: string) {
    this.degreeType.emit(degreeType);
  }

  addFormArray(form: FormArray<any>) {
    const data = this.fb.group({ title: [''] });
    form.push(data);
  }

  deleteFormArray(form: FormArray<any>, index: number) {
    form.removeAt(index);
  }

  loadComponent(index: number) {
    const viewContainerRef = this.myHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent<DynamicComponent>(
      this.service.componentList[--index]
    );
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
}
