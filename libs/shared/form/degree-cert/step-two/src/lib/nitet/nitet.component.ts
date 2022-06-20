import { Component, forwardRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { providerFactory } from '@ksp/shared/utility';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ksp-step-2-nitet',
  templateUrl: './nitet.component.html',
  styleUrls: ['./nitet.component.scss'],
  //providers: providerFactory(NitetComponent),
  providers: [
    {
      provide: KspFormBaseComponent,
      useExisting: forwardRef(() => NitetComponent),
    },
  ],
})
export class NitetComponent extends KspFormBaseComponent {
  experienceYearFocused = false;
  opaciseBox: boolean[] = [];

  nitetForm = this.fb.group({
    generalInfo: [],
    experienceYear: [],
    instructorInfo: [],
  });

  override form = this.fb.group({
    nitets: this.fb.array([this.nitetForm]),
  });

  constructor(private fb: FormBuilder) {
    super();
  }

  /* ngOnInit(): void {
    this.nitetForm.valueChanges.pipe(debounceTime(750)).subscribe((res) => {
      //console.log('form value = ', res);
    });
  }
 */
  addNitet() {
    const form = this.fb.group({
      generalInfo: [],
      experienceYear: [],
      instructorInfo: [],
    });

    this.nitets.push(form);
  }

  deleteNitet(index: number) {
    this.nitets.removeAt(index);
  }

  get experienceYear() {
    if (this.experienceYearFocused)
      return this.nitetForm.controls.experienceYear.value ?? 99;
    else {
      return 99;
    }
  }

  get nitets() {
    return this.form.controls.nitets;
  }
}
