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
        path: 'detail',
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
    RouterModule.forChild(routes),
  ],
  declarations: [TestPerformanceListComponent, TestPerformanceDetailComponent],
  exports: [TestPerformanceListComponent, TestPerformanceDetailComponent],
})
export class EServiceStandardPerformanceResultModule {}
