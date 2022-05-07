import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniServiceContainerPageComponent } from './uni-service-container-page/uni-service-container-page.component';
import { RouterModule } from '@angular/router';
import { SelfServiceUiMenuModule } from '@ksp/self-service/ui/menu';
import { SharedUiSideMenuModule } from '@ksp/shared/ui/side-menu';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SelfServiceUiMenuModule,
    SharedUiSideMenuModule,
  ],
  declarations: [UniServiceContainerPageComponent],
  exports: [UniServiceContainerPageComponent],
})
export class UniServiceFeatureContainerPageModule {}
