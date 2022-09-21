import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ksp-license-info',
  templateUrl: './license-info.component.html',
  styleUrls: ['./license-info.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class LicenseInfoComponent {
  @Input() isLicenseRevoked = false;
  @Input() isHasTitle = false;
  @Input() subTitle1 = 'วันเดือนปีที่ออก';
  @Input() subTitle2 = 'วันเดือนปีที่หมดอายุ';

  constructor(private router: Router) {}

  select() {
    this.router.navigate(['/', 'staff-management', 'staff-person-info']);
  }
}
