import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SchoolRequestSubType } from '@ksp/shared/constant';
import { SelfLicense } from '@ksp/shared/interface';
import { ThaiDatePipe } from '@ksp/shared/pipe';

@Component({
  selector: 'ksp-license-info',
  templateUrl: './license-info.component.html',
  styleUrls: ['./license-info.component.scss'],
  standalone: true,
  imports: [CommonModule, ThaiDatePipe],
})
export class LicenseInfoComponent {
  @Input() isLicenseRevoked = false;
  @Input() isHasTitle = false;
  @Input() subTitle1 = 'วันเดือนปีที่ออก';
  @Input() subTitle2 = 'วันเดือนปีที่หมดอายุ';
  @Input() rewardTitleName = '';
  @Input() license: SelfLicense | null = null;
  @Output() selected = new EventEmitter<string>();


  select(licenseno: string | null | undefined) {
    if (licenseno) {
      this.selected.emit(licenseno);
    }
  }
}
