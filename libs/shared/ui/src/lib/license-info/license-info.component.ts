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

  @Input() licenseNo: string | null = '';
  @Input() careerType: string | null = '';
  @Input() idCardNo: string | null = '';
  @Input() licenseType: string | null = '';
  @Input() thaiName: string | null = '';
  @Input() enName: string | null = '';
  @Input() birthDate: string | null = '';
  @Input() licenseStartDate: string | null = '';
  @Input() licenseEndDate: string | null = '';

  constructor(private router: Router) {}

  select() {
    this.router.navigate(['/staff-management', 'staff-person-info']);
  }
}
