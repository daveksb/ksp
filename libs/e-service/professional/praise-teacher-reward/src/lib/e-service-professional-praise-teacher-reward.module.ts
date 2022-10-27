import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EPraiseTeacherListComponent } from './e-praise-teacher-list/e-praise-teacher-list.component';
import { EPraiseTeacherDetailComponent } from './e-praise-teacher-detail/e-praise-teacher-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { TopNavComponent, BottomNavComponent } from '@ksp/shared/menu';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { SharedFormSelfRewardFormModule } from '@ksp/shared/form/self-reward-form';
import { SelfServiceFormModule } from '@ksp/self-service/form';
import { EServiceRewardSearchComponent } from '@ksp/shared/search';
import { ThaiDatePipe } from '@ksp/shared/pipe';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import {
  ValidateKspRequestComponent,
  ConsiderKspRequestComponent,
} from '@ksp/e-service/e-license/approve-ksp-request';
import { EPraiseTeacherConfirmComponent } from './e-praise-teacher-confirm/e-praise-teacher-confirm.component';

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
        component: EPraiseTeacherListComponent,
      },
      {
        path: 'detail/:id',
        component: EPraiseTeacherDetailComponent,
      },
      {
        path: 'confirm/:id',
        component: EPraiseTeacherConfirmComponent,
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
    EPraiseTeacherListComponent,
    EPraiseTeacherDetailComponent,
    EPraiseTeacherConfirmComponent,
  ],
  exports: [EPraiseTeacherListComponent, EPraiseTeacherDetailComponent],
})
export class EServiceProfessionalPraiseTeacherRewardModule {}
