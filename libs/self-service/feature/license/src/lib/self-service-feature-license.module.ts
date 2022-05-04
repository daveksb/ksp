import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfServiceLicenseMainComponent } from './self-service-license-main/self-service-license-main.component';
import { RouterModule } from '@angular/router';
import { SelfServiceUiMenuModule } from '@ksp/self-service/ui/menu';
import { SelfServiceLicenseRequestComponent } from './self-service-license-request/self-service-license-request.component';
import { SelfServiceUiFormsModule } from '@ksp/self-service/ui/forms';
import { SelfServiceUiTabContainerModule } from '@ksp/self-service/ui/tab-container';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SelfServiceUiMenuModule,
    SelfServiceUiFormsModule,
    SelfServiceUiTabContainerModule,
  ],
  declarations: [
    SelfServiceLicenseMainComponent,
    SelfServiceLicenseRequestComponent,
  ],
  exports: [
    SelfServiceLicenseMainComponent,
    SelfServiceLicenseRequestComponent,
  ],
})
export class SelfServiceFeatureLicenseModule {}
