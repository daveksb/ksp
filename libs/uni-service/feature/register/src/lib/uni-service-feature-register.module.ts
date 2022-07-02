import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UniServiceFormModule } from '@ksp/uni-service/form';
import { UniRegisterRequesterComponent } from './uni-register-requester/uni-register-requester.component';
import { UniRegisterCoordinatorComponent } from './uni-register-coordinator/uni-register-coordinator.component';
import { UniServiceFeatureRegisterRoutingModule } from './uni-service-feature-register-routing.module';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { UniversitySelectComponent } from '@ksp/shared/form/university-select';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import {
  BottomNavComponent,
  StepperNavComponent,
  TopNavSecondComponent,
} from '@ksp/shared/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    UniServiceFeatureRegisterRoutingModule,
    RouterModule,
    UniServiceFormModule,
    TopNavSecondComponent,
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
    UniRegisterRequesterComponent,
    UniRegisterCoordinatorComponent,
  ],
})
export class UniServiceFeatureRegisterModule {}
