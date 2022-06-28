import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { EServiceUiAccusationInfoModule } from '@ksp/e-service/ui/accusation-info';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { BottomNavComponent } from '@ksp/shared/menu';
import {
  LicenseInfoComponent,
  LicenseTypeButtonGroupComponent,
  RequestHeaderInfoComponent,
} from '@ksp/shared/ui';
import { providerFactory } from '@ksp/shared/utility';

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
    ReactiveFormsModule,
  ],
  providers: providerFactory(InquiryDetailComponent),
})
export class InquiryDetailComponent extends KspFormBaseComponent {
  @Input() hideAllButtons = false;
  @Input() hideContainer = false;
  @Input() hideTitle = false;

  override form = this.fb.group({
    boardOrder: [],
    boardDate: [],
    reportDate: [],
    inquiryReport: [],
    considerLevelTimes: [],
    considerLevelDate: [],
    considerLevelReason: [],
    consider: [],
    considerDay: [],
    considerDateFrom: [],
    considerDateTo: [],
    boardOtherReason: [],
  });

  constructor(private router: Router, private fb: FormBuilder) {
    super();
    this.subscriptions.push(
      // any time the inner form changes update the parent of any change
      this.form?.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  next() {
    this.router.navigate(['/', 'ethics', 'inquiry', 'result']);
  }

  cancel() {
    this.router.navigate(['/', 'ethics', 'inquiry']);
  }
}
