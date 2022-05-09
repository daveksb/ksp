import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfServiceContainerPageComponent } from './self-service-container-page/self-service-container-page.component';
import { RouterModule } from '@angular/router';
import { SelfServiceUiMenuModule } from '@ksp/self-service/ui/menu';
import { SelfServiceLicenseRequestComponent } from './self-service-license-request/self-service-license-request.component';
import { SelfServiceUiFormsModule } from '@ksp/self-service/ui/forms';
import { SelfServiceLicenseEditComponent } from './self-service-license-edit/self-service-license-edit.component';
import { SharedUiSideMenuModule } from '@ksp/shared/ui/side-menu';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SelfServiceUiMenuModule,
    SelfServiceUiFormsModule,
    SharedUiSideMenuModule,
    MatTabsModule,
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
