import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'uni-service-print-request-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './print-request-dialog.component.html',
  styleUrls: ['./print-request-dialog.component.scss'],
})
export class PrintRequestDialogComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
