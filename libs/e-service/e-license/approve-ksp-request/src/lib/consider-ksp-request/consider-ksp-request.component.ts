import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'ksp-consider-ksp-request',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule],
  templateUrl: './consider-ksp-request.component.html',
  styleUrls: ['./consider-ksp-request.component.scss'],
})
export class ConsiderKspRequestComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
