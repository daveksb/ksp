import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelfServiceMasterPageComponent } from './self-service-master-page/self-service-master-page.component';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';
import { SharedUiSideMenuModule } from '@ksp/shared/ui/side-menu';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedUiSideMenuModule,
    SharedUiTopNavModule,
  ],
  declarations: [SelfServiceMasterPageComponent],
  exports: [SelfServiceMasterPageComponent],
})
export class SelfServiceFeatureMasterPageModule {}
