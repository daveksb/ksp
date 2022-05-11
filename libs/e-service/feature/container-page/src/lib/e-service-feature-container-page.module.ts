import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EServiceContainerPageComponent } from './e-service-container-page/e-service-container-page.component';
import { SharedUiSideMenuModule } from '@ksp/shared/ui/side-menu';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, SharedUiSideMenuModule, RouterModule],
  declarations: [EServiceContainerPageComponent],
  exports: [EServiceContainerPageComponent],
})
export class EServiceFeatureContainerPageModule {}
