import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BasicInstituteSearchComponent } from '../basic-institute-search/basic-institute-search.component';

@Component({
  selector: 'ksp-e-service-user-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BasicInstituteSearchComponent],
  templateUrl: './e-service-user-search.component.html',
  styleUrls: ['./e-service-user-search.component.scss'],
})
export class EServiceUserSearchComponent {
  form = this.fb.group({
    institution: [],
    personId: [],
    name: [],
    status: [],
  });

  //@Input() mode: InstituteType = 'school';
  @Output() search = new EventEmitter<boolean>();
  @Output() clear = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder) {}
}
