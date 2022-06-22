import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolServiceContainerPageComponent } from './school-service-container-page/school-service-container-page.component';
import { RouterModule } from '@angular/router';
import { SharedMenuModule } from '@ksp/shared/menu';
import { BottomNavComponent } from '@ksp/shared/menu';

@NgModule({
  imports: [CommonModule, SharedMenuModule, BottomNavComponent, RouterModule],
  declarations: [SchoolServiceContainerPageComponent],
  exports: [SchoolServiceContainerPageComponent],
})
export class SchoolServiceFeatureContainerPageModule {}
