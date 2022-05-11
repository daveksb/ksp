import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolServiceContainerPageComponent } from './school-service-container-page/school-service-container-page.component';
import { RouterModule } from '@angular/router';
import { SharedUiSideMenuModule } from '@ksp/shared/ui/side-menu';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';

@NgModule({
  imports: [
    CommonModule,
    SharedUiSideMenuModule,
    SharedUiBottomMenuModule,
    RouterModule,
    SharedUiTopNavModule,
  ],
  declarations: [SchoolServiceContainerPageComponent],
  exports: [SchoolServiceContainerPageComponent],
})
export class SchoolServiceFeatureContainerPageModule {}
