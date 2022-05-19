import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SelfServiceUiMenuModule } from '@ksp/self-service/ui/menu';
import { SelfServiceLicenseRequestComponent } from './self-service-license-request/self-service-license-request.component';
import { SelfServiceUiFormsModule } from '@ksp/self-service/ui/forms';
import { SelfServiceLicenseEditComponent } from './self-service-license-edit/self-service-license-edit.component';
import { SharedUiSideMenuModule } from '@ksp/shared/ui/side-menu';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';
import { SharedUiFormModule } from '@ksp/shared/ui/form';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SelfServiceUiMenuModule,
    SelfServiceUiFormsModule,
    SharedUiFormModule,
    SharedUiSideMenuModule,
    MatTabsModule,
    SharedUiTopNavModule,
  ],
  declarations: [
    SelfServiceLicenseRequestComponent,
    SelfServiceLicenseEditComponent,
  ],
  exports: [
    SelfServiceLicenseRequestComponent,
    SelfServiceLicenseEditComponent,
  ],
})
export class SelfServiceFeatureLicenseModule {}
