import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BasicInstituteSearchComponent } from '../basic-institute-search/basic-institute-search.component';

@Component({
  selector: 'ksp-retired-search',
  templateUrl: './retired-search.component.html',
  styleUrls: ['./retired-search.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, BasicInstituteSearchComponent],
})
export class RetiredSearchComponent {
  form = this.fb.group({
    grant: [],
    affiliation: [],
    universityCode: [],
    universityName: [],
    requestNumber: [],
    name: [],
    phone: [],
  });

  @Output() clear = new EventEmitter();
  @Output() search = new EventEmitter();

  constructor(private fb: FormBuilder) {}
}
