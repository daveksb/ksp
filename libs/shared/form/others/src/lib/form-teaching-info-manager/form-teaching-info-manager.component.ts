import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SharedFormOthersModule } from '../shared-form-others.module';

@Component({
  selector: 'ksp-form-teaching-info-manager',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './form-teaching-info-manager.component.html',
  styleUrls: ['./form-teaching-info-manager.component.scss'],
})
export class FormTeachingInfoManagerComponent implements OnInit {

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {

  }


}
