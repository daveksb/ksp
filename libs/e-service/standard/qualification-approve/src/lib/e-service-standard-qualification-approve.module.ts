import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EQualificationApproveDetailComponent } from './e-qualification-approve-detail/e-qualification-approve-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import { TopNavComponent, BottomNavComponent } from '@ksp/shared/menu';
import { RequestNoPipe, ThaiDatePipe } from '@ksp/shared/pipe';
import {
  EServiceRequestSearchComponent,
  RequestSearchComponent,
} from '@ksp/shared/search';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { Route, RouterModule } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { EQualificationApproveListComponent } from './e-qualification-approve-list/e-qualification-approve-list.component';
import {
  QualificationApproveDetailComponent,
  QualificationApprovePersonComponent,
  SharedFormOthersModule,
} from '@ksp/shared/form/others';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EQualificationConfirmComponent } from './e-qualification-confirm/e-qualification-confirm.component';
import {
  ConsiderKspRequestComponent,
  ValidateKspRequestComponent,
} from '@ksp/e-service/e-license/approve-ksp-request';
import { EQualificationConsiderListComponent } from './e-qualification-consider-list/e-qualification-consider-list.component';
import { EQualificationConsiderDetailComponent } from './e-qualification-consider-detail/e-qualification-consider-detail.component';
import { EQualificationConsiderMeetingComponent } from './e-qualification-consider-meeting/e-qualification-consider-meeting.component';
import { PdfRenderComponent } from '@ksp/shared/dialog';
import { FormMeetingRecordComponent } from '@ksp/shared/form/license';

export const routes: Route[] = [
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
        component: EQualificationApproveListComponent,
      },
      {
        path: 'detail/:id',
        component: EQualificationApproveDetailComponent,
      },
      {
        path: 'confirm/:id',
        component: EQualificationConfirmComponent,
      },
      {
        path: 'consider-list',
        component: EQualificationConsiderListComponent,
      },
      {
        path: 'consider-detail/:id',
        component: EQualificationConsiderDetailComponent,
      },
      {
        path: 'consider-meeting',
        component: EQualificationConsiderMeetingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TopNavComponent,
    MatTabsModule,
    RequestHeaderInfoComponent,
    SharedFormOthersModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    EServiceRequestSearchComponent,
    LicenseCheckComponent,
    BottomNavComponent,
    RequestSearchComponent,
    MatPaginatorModule,
    ThaiDatePipe,
    RequestNoPipe,
    MatSortModule,
    QualificationApprovePersonComponent,
    QualificationApproveDetailComponent,
    ValidateKspRequestComponent,
    ConsiderKspRequestComponent,
    PdfRenderComponent,
    FormMeetingRecordComponent,
  ],
  declarations: [
    EQualificationApproveListComponent,
    EQualificationApproveDetailComponent,
    EQualificationConfirmComponent,
    EQualificationConsiderListComponent,
    EQualificationConsiderDetailComponent,
    EQualificationConsiderMeetingComponent,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
  ],
  exports: [
    EQualificationConfirmComponent,
    EQualificationConsiderListComponent,
    EQualificationConsiderDetailComponent,
    EQualificationConsiderMeetingComponent,
  ],
})
export class EServiceStandardQualificationApproveModule {}
