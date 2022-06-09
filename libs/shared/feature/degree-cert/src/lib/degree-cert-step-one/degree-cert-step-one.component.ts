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
import { DegreeCertStepOneService } from './degree-cert-step-one.service';

@Component({
  selector: 'ksp-degree-cert-step-one',
  templateUrl: './degree-cert-step-one.component.html',
  styleUrls: ['./degree-cert-step-one.component.css'],
  providers: [DegreeCertStepOneService],
})
export class DegreeCertStepOneComponent implements OnInit {
  courseTypes: ListData[] = [];
  degreeTypes: ListData[] = [];

  @Input() isViewForm = false;
  @Output() degreeType = new EventEmitter<number>();
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
      console.log('form value = ', res);
    });

    this.step1Form.controls['courseType'].valueChanges.subscribe((res) => {
      this.loadComponent(Number(res));
    });

    this.step1Form.controls['degreeType'].valueChanges.subscribe((res) => {
      this.degreeType.emit(Number(res));
    });

    this.addLocation();
    this.addInstitution();
    this.addLocation2();
  }

  addLocation() {
    const locationForm = this.fb.group({ title: [''] });
    this.locations.push(locationForm);
  }

  addLocation2() {
    const locationForm2 = this.fb.group({ title: [''] });
    this.locations2.push(locationForm2);
  }

  addInstitution() {
    const institutionForm = this.fb.group({ title: [''] });
    this.institutions.push(institutionForm);
  }

  deleteLocation(index: number) {
    this.locations.removeAt(index);
  }

  deleteInstitution(index: number) {
    this.institutions.removeAt(index);
  }

  deleteLocation2(index: number) {
    this.locations2.removeAt(index);
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
