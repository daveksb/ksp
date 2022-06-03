import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-form-user-info',
  templateUrl: './form-user-info.component.html',
  styleUrls: ['./form-user-info.component.scss'],
})
export class FormUserInfoComponent {

  @Input() isInputWhite = false;

  constructor() {}


}
