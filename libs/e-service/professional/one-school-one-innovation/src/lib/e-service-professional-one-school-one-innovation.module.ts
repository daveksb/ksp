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
import { MatPaginatorModule } from '@angular/material/paginator';
import { ThaiDatePipe } from '@ksp/shared/pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import { OsoiRankingListComponent } from './osoi-ranking-list/osoi-ranking-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
        path: 'detail/:id',
        component: OsoiDetailComponent,
      },
      {
        path: 'confirm/:id',
        component: OsoiConfirmComponent,
      },
      {
        path: 'ranking-list',
        component: OsoiRankingListComponent,
      },
      {
        path: 'ranking-detail',
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
    MatPaginatorModule,
    ThaiDatePipe,
    ReactiveFormsModule,
    LicenseCheckComponent,
    MatProgressSpinnerModule,
  ],
  declarations: [
    OsoiListComponent,
    OsoiDetailComponent,
    OsoiConfirmComponent,
    OsoiRankingComponent,
    OsoiObjectionComponent,
    OsoiRankingListComponent,
  ],
  /* exports: [OsoiRankingListComponent], */
  /*   exports: [
    OsoiListComponent,
    OsoiDetailComponent,
    OsoiConfirmComponent,
    OsoiRankingComponent,
    OsoiObjectionComponent,
  ], */
})
export class EServiceProfessionalOneSchoolOneInnovationModule {}
