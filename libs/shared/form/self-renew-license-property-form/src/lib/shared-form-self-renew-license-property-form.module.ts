import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenewLicensePropertyOneComponent } from './renew-license-property-one/renew-license-property-one.component';
import { RenewLicensePropertyTwoComponent } from './renew-license-property-two/renew-license-property-two.component';
import { RenewLicensePropertyThreeComponent } from './renew-license-property-three/renew-license-property-three.component';
import { RenewLicensePropertyFourComponent } from './renew-license-property-four/renew-license-property-four.component';
import { RenewLicensePropertyFiveComponent } from './renew-license-property-five/renew-license-property-five.component';
import { RenewLicensePropertySixComponent } from './renew-license-property-six/renew-license-property-six.component';
import { SchoolServiceFormActivityModule } from '@ksp/school-service/form/activity';
import { RenewLicensePropertyDegreeFormComponent } from './renew-license-property-degree-form/renew-license-property-degree-form.component';

@NgModule({
  imports: [
    CommonModule,
    SchoolServiceFormActivityModule,
    RenewLicensePropertyDegreeFormComponent,
  ],
  declarations: [
    RenewLicensePropertyOneComponent,
    RenewLicensePropertyTwoComponent,
    RenewLicensePropertyThreeComponent,
    RenewLicensePropertyFourComponent,
    RenewLicensePropertyFiveComponent,
    RenewLicensePropertySixComponent,
  ],
  exports: [
    RenewLicensePropertyOneComponent,
    RenewLicensePropertyTwoComponent,
    RenewLicensePropertyThreeComponent,
    RenewLicensePropertyFourComponent,
    RenewLicensePropertyFiveComponent,
    RenewLicensePropertySixComponent,
  ],
})
export class SharedFormSelfRenewLicensePropertyFormModule {}
