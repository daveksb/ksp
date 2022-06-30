import { Component, Input } from '@angular/core';

@Component({
  selector: 'uni-form-register-coordinator',
  templateUrl: './form-register-coordinator.component.html',
  styleUrls: ['./form-register-coordinator.component.scss'],
})
export class FormRegisterCoordinatorInfoComponent {
  @Input() formHeader = '';
}
