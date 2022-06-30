import { Component, Input } from '@angular/core';

@Component({
  selector: 'uni-register-coordinator-info',
  templateUrl: './register-coordinator-info.component.html',
  styleUrls: ['./register-coordinator-info.component.scss'],
})
export class FormRegisterCoordinatorInfoComponent {
  @Input() formHeader = '';
}
