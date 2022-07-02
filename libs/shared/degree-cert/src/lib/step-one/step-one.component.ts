import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { DynamicComponentDirective } from '@ksp/shared/directive';
import {
  DynamicComponent,
  KspFormBaseComponent,
  ListData,
} from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, skip } from 'rxjs';
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

    courseType: [],
    courseTypeForm: [],

    locations: this.fb.array([]),
    institutions: this.fb.array([]),
    locations2: this.fb.array([]),

    coordinator: [],
  });

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
    this.courseTypes = this.service.courseTypes;
    this.degreeTypes = this.service.degreeTypes;

    this.listenFormChange();
    this.setDefaulFormValue();
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
      this.service.componentList[index]
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
