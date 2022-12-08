import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ETeacherCouncilListComponent } from './e-teacher-council-list/e-teacher-council-list.component';
import { ETeacherCouncilDetailComponent } from './e-teacher-council-detail/e-teacher-council-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import { MatTableModule } from '@angular/material/table';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedFormSelfRewardFormModule } from '@ksp/shared/form/self-reward-form';
import { MatDialogModule } from '@angular/material/dialog';
import { SelfServiceFeatureRewardModule } from '@ksp/self-service/feature/reward';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { EServiceRewardSearchComponent } from '@ksp/shared/search';
import { RequestNoPipe, ThaiDatePipe } from '@ksp/shared/pipe';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import { ETeacherCouncilConfirmComponent } from './e-teacher-council-confirm/e-teacher-council-confirm.component';
import {
  ValidateKspRequestComponent,
  ConsiderKspRequestComponent,
} from '@ksp/e-service/e-license/approve-ksp-request';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ETeacherCouncilRejectComponent } from './e-teacher-council-reject/e-teacher-council-reject.component';
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
        component: ETeacherCouncilListComponent,
      },
      {
        path: 'detail/:id',
        component: ETeacherCouncilDetailComponent,
      },
      {
        path: 'confirm/:id',
        component: ETeacherCouncilConfirmComponent,
      },
      {
        path: 'reject/:id',
        component: ETeacherCouncilRejectComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TopNavComponent,
    MatTableModule,
    MatTabsModule,
    SharedFormOthersModule,
    ReactiveFormsModule,
    SharedFormSelfRewardFormModule,
    MatDialogModule,
    BottomNavComponent,
    RequestHeaderInfoComponent,
    EServiceRewardSearchComponent,
    ThaiDatePipe,
    LicenseCheckComponent,
    ValidateKspRequestComponent,
    MatPaginatorModule,
    RequestNoPipe,
    MatDatepickerModule,
  ],
  declarations: [
    ETeacherCouncilListComponent,
    ETeacherCouncilDetailComponent,
    ETeacherCouncilConfirmComponent,
    ETeacherCouncilRejectComponent,
  ],
  exports: [ETeacherCouncilListComponent, ETeacherCouncilDetailComponent],
})
export class EServiceProfessionalTeacherCouncilRewardModule {}
