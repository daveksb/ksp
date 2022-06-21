import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'uni-service-register-coordinator-info',
  templateUrl: './register-coordinator-info.component.html',
  styleUrls: ['./register-coordinator-info.component.scss'],
})
export class FormRegisterCoordinatorInfoComponent implements OnInit {
  @Input() formHeader: any;

  constructor() {}

  ngOnInit(): void {}
}
