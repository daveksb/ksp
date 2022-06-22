import { Component, Input } from '@angular/core';

@Component({
  selector: 'ksp-form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.scss'],
})
export class FormAddressComponent {
  @Input() isWhiteMode = true;

  constructor() {}
}
