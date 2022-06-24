import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { EServiceUiAccusationInfoModule } from '@ksp/e-service/ui/accusation-info';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { BottomNavComponent } from '@ksp/shared/menu';
import {
  LicenseInfoComponent,
  LicenseTypeButtonGroupComponent,
  RequestHeaderInfoComponent,
} from '@ksp/shared/ui';

@Component({
  selector: 'e-service-inquiry-detail',
  templateUrl: './inquiry-detail.component.html',
  styleUrls: ['./inquiry-detail.component.scss'],
  standalone: true,
  imports: [
    MatTabsModule,
    CommonModule,
    MatIconModule,
    BottomNavComponent,
    SharedFormOthersModule,
    EServiceUiAccusationInfoModule,
    RequestHeaderInfoComponent,
    LicenseTypeButtonGroupComponent,
    LicenseInfoComponent,
    FileUploadComponent,
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
