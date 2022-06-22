import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolServiceContainerPageComponent } from './school-service-container-page/school-service-container-page.component';
import { RouterModule } from '@angular/router';
import { SharedMenuModule } from '@ksp/shared/menu';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';

@NgModule({
  imports: [
    CommonModule,
    SharedMenuModule,
    SharedUiBottomMenuModule,
    RouterModule,
  ],
  declarations: [SchoolServiceContainerPageComponent],
  exports: [SchoolServiceContainerPageComponent],
})
export class SchoolServiceFeatureContainerPageModule {}
