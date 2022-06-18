import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { EServiceUiAccusationInfoModule } from '@ksp/e-service/ui/accusation-info';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import { SharedUiLicenseInfoModule } from '@ksp/shared/ui/license-info';
import { SharedUiLicenseTypeButtonGroupModule } from '@ksp/shared/ui/license-type-button-group';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui/request-header-info';

@Component({
  selector: 'e-service-inquiry-detail',
  templateUrl: './inquiry-detail.component.html',
  styleUrls: ['./inquiry-detail.component.scss'],
  standalone: true,
  imports: [
    MatTabsModule,
    CommonModule,
    MatIconModule,
    SharedUiBottomMenuModule,
    SharedFormOthersModule,
    SharedUiLicenseTypeButtonGroupModule,
    EServiceUiAccusationInfoModule,
    SharedUiLicenseInfoModule,
    RequestHeaderInfoComponent,
  ],
})
export class InquiryDetailComponent {
  constructor(private router: Router) {}

  @Input() hideAllButtons = false;
  @Input() hideContainer = false;
  @Input() hideTitle = false;

  next() {
    this.router.navigate(['/', 'ethics', 'inquiry', 'result']);
  }

  cancel() {
    this.router.navigate(['/', 'ethics', 'inquiry']);
  }
}
