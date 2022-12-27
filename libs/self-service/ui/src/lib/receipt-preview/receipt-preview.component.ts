import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'self-service-receipt-preview',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './receipt-preview.component.html',
  styleUrls: ['./receipt-preview.component.scss'],
})
export class ReceiptPreviewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
