import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { providerFactory, thaiDate } from '@ksp/shared/utility';
import { KspFormBaseComponent } from '@ksp/shared/interface';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'e-service-inquiry-result',
  templateUrl: './inquiry-result.component.html',
  styleUrls: ['./inquiry-result.component.scss'],
  standalone: true,
  imports: [
    MatTabsModule,
    CommonModule,
    BottomNavComponent,
    SharedFormOthersModule,
    EServiceUiAccusationInfoModule,
    RequestHeaderInfoComponent,
    LicenseTypeButtonGroupComponent,
    LicenseInfoComponent,
    FileUploadComponent,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  providers: providerFactory(InquiryResultComponent),
})
export class InquiryResultComponent extends KspFormBaseComponent {
  override form = this.fb.group({
    resultredno: [],
    resultcomitteeno: [],
    resultcomitteedate: [],
    resultcomitteefile: [],
    resulttoaccuserdate: [],
    resulttoaccuserfile: [],
    resulttoschooldate: [],
    resulttoschoolfile: [],
    resulttoaccuseddate: [],
    resulttoaccusedfile: [],
  });
  today = thaiDate(new Date());
  requestNumber = '';
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
