import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniRegisterCoordinatorComponent } from './uni-register-coordinator/uni-register-coordinator.component';
import { UniRegisterPasswordComponent } from './uni-register-password/uni-register-password.component';
import { UniRegisterRequesterComponent } from './uni-register-requester/uni-register-requester.component';
import { UniRegisterSelectUniComponent } from './uni-register-selectuni/uni-register-selectuni.component';
import { UniRegisterStatusComponent } from './uni-register-status/uni-register-status.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'select-university',
    pathMatch: 'full',
  },
  {
    path: 'select-university',
    component: UniRegisterSelectUniComponent
  },
  {
    path: 'requester',
    component: UniRegisterRequesterComponent,
  },
  {
    path: 'coordinator',
    component: UniRegisterCoordinatorComponent,
  },
  {
    path: 'password',
    component: UniRegisterPasswordComponent
  },
  {
    path: 'status',
    component: UniRegisterStatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniServiceFeatureRegisterRoutingModule {}
