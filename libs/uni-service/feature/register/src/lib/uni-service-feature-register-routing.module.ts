import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniRegisterCoordinatorComponent } from './uni-register-coordinator/uni-register-coordinator.component';
import { UniRegisterRequesterComponent } from './uni-register-requester/uni-register-requester.component';

const routes: Routes = [
  {
    path: 'requester',
    component: UniRegisterRequesterComponent,
  },
  {
    path: 'coordinator',
    component: UniRegisterCoordinatorComponent,
  },
  {
    path: '**',
    component: UniRegisterRequesterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniServiceFeatureRegisterRoutingModule {}
