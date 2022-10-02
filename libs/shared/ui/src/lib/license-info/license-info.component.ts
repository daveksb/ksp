import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelfLicense } from '@ksp/shared/constant';

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
  @Input() license: SelfLicense | null = null;
  @Output() selected = new EventEmitter<string>();

  select(idcardno: string | null | undefined) {
    if (idcardno) {
      this.selected.emit(idcardno);
    }
  }
}
