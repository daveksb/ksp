import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPerformanceListComponent } from './test-performance-list/test-performance-list.component';
import { TestPerformanceDetailComponent } from './test-performance-detail/test-performance-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
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
        component: TestPerformanceListComponent,
      },
      {
        path: 'detail/:id',
        component: TestPerformanceDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    TopNavComponent,
    MatCheckboxModule,
    MatTableModule,
    BottomNavComponent,
    MatDialogModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
  declarations: [TestPerformanceListComponent, TestPerformanceDetailComponent],
  exports: [TestPerformanceListComponent, TestPerformanceDetailComponent],
})
export class EServiceStandardPerformanceResultModule {}
