import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UniServiceFormModule } from '@ksp/uni-service/form';
import { UniServiceRegisterRequesterComponent } from './uni-service-register-requester/uni-service-register-requester.component';
import { UniServiceRegisterCoordinatorComponent } from './uni-service-register-coordinator/uni-service-register-coordinator.component';
import { UniServiceFeatureRegisterRoutingModule } from './uni-service-feature-register-routing.module';
import { UniServiceUiNavModule } from '@ksp/uni-service/ui/nav';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { UniversitySelectComponent } from '@ksp/shared/form/university-select';
import {
  RequestHeaderInfoComponent,
  StepperNavComponent,
} from '@ksp/shared/ui';
import { BottomNavComponent } from '@ksp/shared/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    UniServiceFeatureRegisterRoutingModule,
    RouterModule,
    UniServiceFormModule,
    UniServiceUiNavModule,
    SharedFormOthersModule,
    BottomNavComponent,
    RequestHeaderInfoComponent,
    UniversitySelectComponent,
    MatIconModule,
    MatStepperModule,
    StepperNavComponent,
    ReactiveFormsModule,
  ],
  declarations: [
    UniServiceRegisterRequesterComponent,
    UniServiceRegisterCoordinatorComponent,
  ],
})
export class UniServiceFeatureRegisterModule {}
