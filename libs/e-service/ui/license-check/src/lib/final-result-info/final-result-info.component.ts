import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'e-service-final-result-info',
  templateUrl: './final-result-info.component.html',
  styleUrls: ['./final-result-info.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule],
})
export class FinalResultInfoComponent {}
