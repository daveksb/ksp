import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ksp-form-address-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-address-table.component.html',
  styleUrls: ['./form-address-table.component.scss'],
})
export class FormAddressTableComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
