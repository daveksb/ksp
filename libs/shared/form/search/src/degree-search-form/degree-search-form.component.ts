import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'ksp-degree-search-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './degree-search-form.component.html',
  styleUrls: ['./degree-search-form.component.scss'],
})
export class DegreeSearchFormComponent {
  @Output() clear = new EventEmitter<boolean>();
  @Output() search = new EventEmitter<boolean>();

  form = this.fb.group({
    institution: [],
    affiliation: [],
    degreeCode: [],
    degreeName: [],
    degreeLvel: [],
    openYear: [],
    requestNumber: [],
    requestsubmitDate: [],
  });

  constructor(private fb: FormBuilder) {}
}
