import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EQualificationApproveDetailComponent } from './e-qualification-approve-detail/e-qualification-approve-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { LicenseCheckComponent } from '@ksp/e-service/ui/license-check';
import { TopNavComponent, BottomNavComponent } from '@ksp/shared/menu';
import { ThaiDatePipe } from '@ksp/shared/pipe';
import {
  EServiceRequestSearchComponent,
  RequestSearchComponent,
} from '@ksp/shared/search';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { Route, RouterModule } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { EQualificationApproveListComponent } from './e-qualification-approve-list/e-qualification-approve-list.component';
import { SharedFormOthersModule } from '@ksp/shared/form/others';
import { MatSortModule } from '@angular/material/sort';

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
      /*       {
        path: 'detail',
        component: EQualificationApproveDetailComponent,
      }, */
      {
        path: 'detail/:id',
        component: EQualificationApproveDetailComponent,
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
    EServiceRequestSearchComponent,
    LicenseCheckComponent,
    BottomNavComponent,
    RequestSearchComponent,
    MatPaginatorModule,
    ThaiDatePipe,
    MatSortModule,
  ],
  declarations: [
    EQualificationApproveListComponent,
    EQualificationApproveDetailComponent,
  ],
  /*   exports: [
    EQualificationApproveListComponent,
    EQualificationApproveDetailComponent,
  ], */
})
export class EServiceStandardQualificationApproveModule {}
