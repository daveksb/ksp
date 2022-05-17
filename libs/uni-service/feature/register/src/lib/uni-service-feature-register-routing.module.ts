import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniServiceRegisterCoordinatorComponent } from './uni-service-register-coordinator/uni-service-register-coordinator.component';
import { UniServiceRegisterRequesterComponent } from './uni-service-register-requester/uni-service-register-requester.component';

const routes: Routes = [
  {
    path: 'requester',
    component: UniServiceRegisterRequesterComponent,
  },
  {
    path: 'coordinator',
    component: UniServiceRegisterCoordinatorComponent,
  },
  {
    path: '**',
    component: UniServiceRegisterRequesterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniServiceFeatureRegisterRoutingModule {}
