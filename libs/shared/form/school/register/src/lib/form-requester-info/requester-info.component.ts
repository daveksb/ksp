import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCoordinatorInfoComponent } from '../form-coordinator-info/coordinator-info.component';
import { SetGrayBackgroundDirective } from '@ksp/shared/directive';

@Component({
  selector: 'ksp-form-requester-info',
  standalone: true,
  imports: [CommonModule, FormCoordinatorInfoComponent, SetGrayBackgroundDirective],
  templateUrl: './requester-info.component.html',
  styleUrls: ['./requester-info.component.scss'],
})
export class FormRequesterInfoComponent {}
