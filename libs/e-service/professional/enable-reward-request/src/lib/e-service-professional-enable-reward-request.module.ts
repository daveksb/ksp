import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { EnableRewardRequestListComponent } from './enable-reward-request-list/enable-reward-request-list.component';
import { TopNavComponent } from '@ksp/shared/menu';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';

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
        component: EnableRewardRequestListComponent,
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
    MatDialogModule,
    MatDatepickerModule,
    MatPaginatorModule,
  ],
  declarations: [EnableRewardRequestListComponent],
  exports: [EnableRewardRequestListComponent],
})
export class EServiceProfessionalEnableRewardRequestModule {}
