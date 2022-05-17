import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EServiceContainerPageComponent } from './e-service-container-page/e-service-container-page.component';
import { SharedUiSideMenuModule } from '@ksp/shared/ui/side-menu';
import { RouterModule } from '@angular/router';
import { SharedUiTopNavModule } from '@ksp/shared/ui/top-nav';

@NgModule({
  imports: [CommonModule, SharedUiSideMenuModule, RouterModule, SharedUiTopNavModule],
  declarations: [EServiceContainerPageComponent],
  exports: [EServiceContainerPageComponent],
})
export class EServiceFeatureContainerPageModule {}
