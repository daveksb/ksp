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
import { DynamicComponent, FormMode, ListData } from '@ksp/shared/interface';
import { debounceTime } from 'rxjs';
import { DegreeCertStepOneService } from './step-one.service';

@Component({
  selector: 'ksp-degree-cert-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css'],
  providers: [DegreeCertStepOneService],
})
export class DegreeCertStepOneComponent implements OnInit {
  courseTypes: ListData[] = [];
  degreeTypes: ListData[] = [];

  private _mode: FormMode = 'edit';

  @Input()
  set mode(value: FormMode) {
    this._mode = value;
    if (value === 'view') this.form.disable();
  }

  get mode(): FormMode {
    return this._mode;
  }

  @Output() degreeType = new EventEmitter<string>();
  @ViewChild(DynamicComponentDirective, { static: true })
  myHost!: DynamicComponentDirective;

  form = this.fb.group({
    degreeType: [],
    courseType: [],
    year: [],
    courseName: [],
    locations: this.fb.array([]),
    institutions: this.fb.array([]),
    locations2: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    private service: DegreeCertStepOneService
  ) {}

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
    this.form.valueChanges.pipe(debounceTime(750)).subscribe((res) => {
      //console.log('form value = ', res);
    });

    this.form.controls['courseType'].valueChanges.subscribe((res) => {
      this.loadComponent(Number(res));
    });

    this.form.controls['degreeType'].valueChanges.subscribe((res) => {
      // it has 8 degree types and target with 2 form types
      const degreeType = Number(res) < 4 ? 'a' : 'b';
      this.degreeType.emit(degreeType);
    });
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
