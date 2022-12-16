import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EKnowledgeCertListComponent } from './e-knowledge-cert-list/e-knowledge-cert-list.component';
import { EKnowledgeCertDetailComponent } from './e-knowledge-cert-detail/e-knowledge-cert-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Routes, RouterModule } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import {
  SelfServiceFormModule,
  FormUploadImageComponent,
} from '@ksp/self-service/form';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { TopNavComponent, BottomNavComponent } from '@ksp/shared/menu';
import { RequestNoPipe, ThaiDatePipe } from '@ksp/shared/pipe';
import {
  EServiceRequestSearchComponent,
  RequestSearchComponent,
  EServiceLicenseSearchComponent,
} from '@ksp/shared/search';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { EKnowledgeCertConfirmComponent } from './e-knowledge-cert-confirm/e-knowledge-cert-confirm.component';
import { ValidateKspRequestComponent } from '@ksp/e-service/e-license/approve-ksp-request';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export const routes: Routes = [
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
        component: EKnowledgeCertListComponent,
      },
      {
        path: 'detail',
        component: EKnowledgeCertDetailComponent,
      },
      {
        path: 'detail/:id',
        component: EKnowledgeCertDetailComponent,
      },
      {
        path: 'confirm/:id',
        component: EKnowledgeCertConfirmComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TopNavComponent,
    SelfServiceFormModule,
    SharedFormOthersModule,
    MatTabsModule,
    FormUploadImageComponent,
    ReactiveFormsModule,
    BottomNavComponent,
    LicenseCheckComponent,
    RequestHeaderInfoComponent,
    EServiceRequestSearchComponent,
    MatTableModule,
    RequestSearchComponent,
    MatPaginatorModule,
    ThaiDatePipe,
    EServiceLicenseSearchComponent,
    ValidateKspRequestComponent,
    MatProgressSpinnerModule,
    RequestNoPipe
  ],
  declarations: [
    EKnowledgeCertListComponent,
    EKnowledgeCertDetailComponent,
    EKnowledgeCertConfirmComponent,
  ],
  exports: [EKnowledgeCertListComponent, EKnowledgeCertDetailComponent],
})
export class EServiceStandardKnowledgeCertModule {}
