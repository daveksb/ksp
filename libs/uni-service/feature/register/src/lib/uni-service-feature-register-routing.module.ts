import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniRegisterCoordinatorComponent } from './uni-register-coordinator/uni-register-coordinator.component';
import { UniRegisterRequesterComponent } from './uni-register-requester/uni-register-requester.component';
import { UniRegisterStatusComponent } from './uni-register-status/uni-register-status.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'requester',
    pathMatch: 'full',
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
    path: 'status',
    component: UniRegisterStatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniServiceFeatureRegisterRoutingModule {}
