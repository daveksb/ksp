import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfServiceMasterPageComponent } from './self-service-master-page/self-service-master-page.component';

import { SharedMenuModule, TopNavComponent } from '@ksp/shared/menu';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule, SharedMenuModule, TopNavComponent],
  declarations: [SelfServiceMasterPageComponent],
})
export class SelfServiceFeatureMasterPageModule {}
