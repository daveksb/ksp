import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ksp-form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.scss'],
})
export class FormAddressComponent implements OnInit {
  @Input() isWhiteMode = true;

  constructor() {}

  ngOnInit(): void {}
}
