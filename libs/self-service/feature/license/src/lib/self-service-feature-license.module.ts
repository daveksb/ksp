import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfServiceContainerPageComponent } from './self-service-container-page/self-service-container-page.component';
import { RouterModule } from '@angular/router';
import { SelfServiceUiMenuModule } from '@ksp/self-service/ui/menu';
import { SelfServiceLicenseRequestComponent } from './self-service-license-request/self-service-license-request.component';
import { SelfServiceUiFormsModule } from '@ksp/self-service/ui/forms';
import { SelfServiceUiTabContainerModule } from '@ksp/self-service/ui/tab-container';
import { SelfServiceLicenseEditComponent } from './self-service-license-edit/self-service-license-edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SelfServiceUiMenuModule,
    SelfServiceUiFormsModule,
    SelfServiceUiTabContainerModule,
  ],
  declarations: [
    SelfServiceContainerPageComponent,
    SelfServiceLicenseRequestComponent,
    SelfServiceLicenseEditComponent,
  ],
  exports: [
    SelfServiceContainerPageComponent,
    SelfServiceLicenseRequestComponent,
    SelfServiceLicenseEditComponent,
  ],
})
export class SelfServiceFeatureLicenseModule {}
