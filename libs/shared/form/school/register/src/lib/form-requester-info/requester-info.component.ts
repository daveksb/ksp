import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCoordinatorInfoComponent } from '../form-coordinator-info/coordinator-info.component';

@Component({
  selector: 'ksp-form-requester-info',
  standalone: true,
  imports: [CommonModule, FormCoordinatorInfoComponent],
  templateUrl: './requester-info.component.html',
  styleUrls: ['./requester-info.component.scss'],
})
export class FormRequesterInfoComponent {}
