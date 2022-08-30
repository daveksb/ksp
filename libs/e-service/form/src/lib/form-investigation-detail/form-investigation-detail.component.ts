import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { EServiceUiAccusationInfoModule } from '@ksp/e-service/ui/accusation-info';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { BottomNavComponent } from '@ksp/shared/menu';
import {
  LicenseInfoComponent,
  LicenseTypeButtonGroupComponent,
  RequestHeaderInfoComponent,
} from '@ksp/shared/ui';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';
import { providerFactory } from '@ksp/shared/utility';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { KspFormBaseComponent } from '@ksp/shared/interface';

@Component({
  selector: 'e-service-form-investigation-detail',
  templateUrl: './form-investigation-detail.component.html',
  styleUrls: ['./form-investigation-detail.component.scss'],
  standalone: true,
  imports: [
    MatTabsModule,
    CommonModule,
    BottomNavComponent,
    SharedFormOthersModule,
    EServiceUiAccusationInfoModule,
    RequestHeaderInfoComponent,
    MatIconModule,
    LicenseTypeButtonGroupComponent,
    LicenseInfoComponent,
    FileUploadComponent,
    ReactiveFormsModule,
  ],
  providers: providerFactory(FormInvestigationDetailComponent),
})
export class FormInvestigationDetailComponent extends KspFormBaseComponent {
  @Input() hideAllButtons = false;
  @Input() hideContainer = false;
  @Input() hideTitle = false;

  override form = this.fb.group({
    orderNumber: [],
    date: [],
    investigateDate: [],
    ReportDate: [],
    reportResult: [],
    decisions: [],
    causeDetail: [],
  });

  decisions = decisions;

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
}

export const decisions = [
  {
    label: 'มีมูลความผิด วินิจฉัยชี้ขาดความผิดเล็กน้อย',
    name: 'decisions',
    value: 1,
  },
  {
    label: 'ตักเตือน / ภาคภัณฑ์ (ต้องเลือกอย่างใดอย่างหนึ่งเสมอ)',
    name: 'decisions',
    value: 2,
  },
  {
    label: 'มีมูลความผิด นำเสนอคณะกรรมการตั้งคณะอนุกรรมการสอบสวน',
    name: 'decisions',
    value: 3,
  },
  {
    label: 'ไม่มีมูล ยุติเรื่อง ยกข้อกล่าวหา',
    name: 'decisions',
    value: 4,
  },
];
