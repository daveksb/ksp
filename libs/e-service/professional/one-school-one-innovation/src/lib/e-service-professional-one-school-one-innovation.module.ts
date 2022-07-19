import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OsoiListComponent } from './osoi-list/osoi-list.component';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { RouterModule, Routes } from '@angular/router';
import { OsoiDetailComponent } from './osoi-detail/osoi-detail.component';

const routes: Routes = [
  {

    path: '',
    component: EServiceContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: OsoiListComponent,
      },
      {
        path: 'approve',
        component: OsoiDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [OsoiListComponent, OsoiDetailComponent],
  exports: [OsoiListComponent, OsoiDetailComponent],
})
export class EServiceProfessionalOneSchoolOneInnovationModule {}
