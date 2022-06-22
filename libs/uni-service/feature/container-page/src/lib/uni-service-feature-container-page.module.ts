import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniServiceContainerPageComponent } from './uni-service-container-page/uni-service-container-page.component';
import { RouterModule } from '@angular/router';
import { SelfServiceUiModule } from '@ksp/self-service/ui';
import { SharedMenuModule, TopNavComponent } from '@ksp/shared/menu';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SelfServiceUiModule,
    SharedMenuModule,
    TopNavComponent,
  ],
  declarations: [UniServiceContainerPageComponent],
  exports: [UniServiceContainerPageComponent],
})
export class UniServiceFeatureContainerPageModule {}
