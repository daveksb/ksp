import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccusationListComponent } from '@ksp/e-service/feature/accusation-list';
import { AccusationRecordComponent } from '@ksp/e-service/feature/accusation-record';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { EServiceLoginComponent } from '@ksp/e-service/feature/login';

const routes: Routes = [
  { path: 'login', component: EServiceLoginComponent },
  {
    path: 'accusation',
    component: EServiceContainerPageComponent,
    children: [
      {
        path: 'list',
        component: AccusationListComponent,
      },
      {
        path: 'record',
        component: AccusationRecordComponent,
      },
    ],
  },
  { path: '**', component: EServiceLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
