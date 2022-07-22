import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ksp-edit-license',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-license.component.html',
  styleUrls: ['./edit-license.component.scss'],
})
export class EditLicenseComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
