import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EBestTeacherListComponent } from './e-best-teacher-list/e-best-teacher-list.component';
import { EBestTeacherDetailComponent } from './e-best-teacher-detail/e-best-teacher-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { TopNavComponent, BottomNavComponent } from '@ksp/shared/menu';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { SelfServiceFormModule } from '@ksp/self-service/form';
import { SharedFormSelfRewardFormModule } from '@ksp/shared/form/self-reward-form';
import { EServiceRewardSearchComponent } from '@ksp/shared/search';
import { ThaiDatePipe } from '@ksp/shared/pipe';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import {
  ValidateKspRequestComponent,
  ConsiderKspRequestComponent,
} from '@ksp/e-service/e-license/approve-ksp-request';
import { EBestTeacherConfirmComponent } from './e-best-teacher-confirm/e-best-teacher-confirm.component';

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
        component: EBestTeacherListComponent,
      },
      {
        path: 'detail/:id',
        component: EBestTeacherDetailComponent,
      },
      {
        path: 'confirm/:id',
        component: EBestTeacherConfirmComponent,
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
    SelfServiceFormModule,
    EServiceRewardSearchComponent,
    ThaiDatePipe,
    LicenseCheckComponent,
    ValidateKspRequestComponent,
  ],
  declarations: [
    EBestTeacherListComponent,
    EBestTeacherDetailComponent,
    EBestTeacherConfirmComponent,
  ],
  exports: [EBestTeacherListComponent, EBestTeacherDetailComponent],
})
export class EServiceProfessionalBestTeacherRewardModule {}
