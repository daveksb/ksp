import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EServiceContainerPageComponent } from './e-service-container-page/e-service-container-page.component';
import { SharedMenuModule, TopNavComponent } from '@ksp/shared/menu';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, SharedMenuModule, RouterModule, TopNavComponent],
  declarations: [EServiceContainerPageComponent],
  exports: [EServiceContainerPageComponent],
})
export class EServiceFeatureContainerPageModule {}
