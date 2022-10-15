import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OsoiListComponent } from './osoi-list/osoi-list.component';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { RouterModule, Routes } from '@angular/router';
import { OsoiDetailComponent } from './osoi-detail/osoi-detail.component';
import { OsoiConfirmComponent } from './osoi-confirm/osoi-confirm.component';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import { RequestRewardFormComponent } from '@ksp/shared/form/school/request-reward';
import { MatDialogModule } from '@angular/material/dialog';
import { OsoiRankingComponent } from './osoi-ranking/osoi-ranking.component';
import { OsoiObjectionComponent } from './osoi-objection/osoi-objection.component';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { FormMeetingRecordComponent } from '@ksp/e-service/ethics/form';
import { MatTableModule } from '@angular/material/table';
import { FileUploadComponent } from '@ksp/shared/form/file-upload';
import { EServiceRewardSearchComponent } from '@ksp/shared/search';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
      {
        path: 'confirm',
        component: OsoiConfirmComponent,
      },
      {
        path: 'ranking',
        component: OsoiRankingComponent,
      },
      {
        path: 'objection',
        component: OsoiObjectionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    TopNavComponent,
    BottomNavComponent,
    RequestRewardFormComponent,
    MatDialogModule,
    RequestHeaderInfoComponent,
    FormMeetingRecordComponent,
    MatTableModule,
    FileUploadComponent,
    RouterModule.forChild(routes),
    EServiceRewardSearchComponent,
    MatDatepickerModule,
  ],
  declarations: [
    OsoiListComponent,
    OsoiDetailComponent,
    OsoiConfirmComponent,
    OsoiRankingComponent,
    OsoiObjectionComponent,
  ],
  exports: [
    OsoiListComponent,
    OsoiDetailComponent,
    OsoiConfirmComponent,
    OsoiRankingComponent,
    OsoiObjectionComponent,
  ],
})
export class EServiceProfessionalOneSchoolOneInnovationModule {}
