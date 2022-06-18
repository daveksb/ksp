import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormMode } from '@ksp/shared/interface';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'ksp-step-2-nitet',
  templateUrl: './nitet.component.html',
  styleUrls: ['./nitet.component.scss'],
})
export class NitetComponent implements OnInit {
  @Input() mode: FormMode = 'edit';

  experienceYearFocused = false;
  opaciseBox: boolean[] = [];

  nitetForm = this.fb.group({
    generalInfo: [],
    experienceYear: [],
    instructorInfo: [],
  });

  form = this.fb.group({
    nitets: this.fb.array([this.nitetForm]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.nitetForm.valueChanges.pipe(debounceTime(750)).subscribe((res) => {
      //console.log('form value = ', res);
    });

    if (this.mode === 'view') {
      this.form.disable();
    }
  }

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
      return this.nitetForm.controls['experienceYear'].value ?? 99;
    else {
      return 99;
    }
  }

  get nitets() {
    return this.form.controls['nitets'];
  }
}
