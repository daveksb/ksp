import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'self-service-register-tooltip',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './register-tooltip.component.html',
  styleUrls: ['./register-tooltip.component.scss'],
})
export class RegisterTooltipComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      image: string;
      style: string;
    }
  ) {}

  ngOnInit(): void {}
}
