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
import { DynamicComponent, ListData } from '@ksp/shared/interface';
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

  @Input() mode = 'edit';
  @Output() degreeType = new EventEmitter<string>();
  @ViewChild(DynamicComponentDirective, { static: true })
  myHost!: DynamicComponentDirective;

  step1Form = this.fb.group({
    degreeType: [''],
    courseType: [''],
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

    this.step1Form.valueChanges.pipe(debounceTime(750)).subscribe((res) => {
      //console.log('form value = ', res);
    });

    this.step1Form.controls['courseType'].valueChanges.subscribe((res) => {
      this.loadComponent(Number(res));
    });

    this.step1Form.controls['degreeType'].valueChanges.subscribe((res) => {
      // it has 8 degree types and target with 2 form types
      const degree = Number(res);
      const degreeType = degree < 4 ? 'a' : 'b';
      //console.log('degree type = ', degreeType);
      this.degreeType.emit(degreeType);
    });

    this.addFormArray(this.locations);
    this.addFormArray(this.institutions);
    this.addFormArray(this.locations2);
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
    return this.step1Form.controls['locations'] as FormArray;
  }

  get institutions() {
    return this.step1Form.controls['institutions'] as FormArray;
  }

  get locations2() {
    return this.step1Form.controls['locations2'] as FormArray;
  }
}
