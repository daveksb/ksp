import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UniServiceFormModule } from '@ksp/uni-service/form';
import { UniServiceRegisterRequesterComponent } from './uni-service-register-requester/uni-service-register-requester.component';
import { UniServiceRegisterCoordinatorComponent } from './uni-service-register-coordinator/uni-service-register-coordinator.component';
import { UniServiceFeatureRegisterRoutingModule } from './uni-service-feature-register-routing.module';
import { UniServiceUiNavModule } from '@ksp/uni-service/ui/nav';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { SharedFormUniversitySelectModule } from '@ksp/shared/form/university-select';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui/request-header-info';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';

@NgModule({
  imports: [
    CommonModule,
    UniServiceFeatureRegisterRoutingModule,
    RouterModule,
    UniServiceFormModule,
    UniServiceUiNavModule,
    SharedFormOthersModule,
    SharedUiBottomMenuModule,
    RequestHeaderInfoComponent,
    SharedFormUniversitySelectModule,
  ],
  declarations: [
    UniServiceRegisterRequesterComponent,
    UniServiceRegisterCoordinatorComponent,
  ],
})
export class UniServiceFeatureRegisterModule {}
