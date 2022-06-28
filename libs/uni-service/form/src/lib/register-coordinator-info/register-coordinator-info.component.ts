import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'uni-register-coordinator-info',
  templateUrl: './register-coordinator-info.component.html',
  styleUrls: ['./register-coordinator-info.component.scss'],
})
export class FormRegisterCoordinatorInfoComponent implements OnInit {
  @Input() formHeader = '';

  constructor() {}

  ngOnInit(): void {}
}
