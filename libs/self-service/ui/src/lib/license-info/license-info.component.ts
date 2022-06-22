import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'self-service-license-info',
  templateUrl: './license-info.component.html',
  styleUrls: ['./license-info.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class LicenseInfoComponent {}
