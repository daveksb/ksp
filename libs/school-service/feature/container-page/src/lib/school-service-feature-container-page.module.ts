import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolServiceContainerPageComponent } from './school-service-container-page/school-service-container-page.component';
import { RouterModule } from '@angular/router';
import { SharedUiSideMenuModule } from '@ksp/shared/ui/side-menu';

@NgModule({
  imports: [CommonModule, SharedUiSideMenuModule, RouterModule],
  declarations: [SchoolServiceContainerPageComponent],
  exports: [SchoolServiceContainerPageComponent],
})
export class SchoolServiceFeatureContainerPageModule {}
