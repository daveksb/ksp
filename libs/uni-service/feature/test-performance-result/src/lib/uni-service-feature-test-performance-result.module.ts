import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPerformanceListComponent } from './test-performance-list/test-performance-list.component';
import { TestPerformanceDetailComponent } from './test-performance-detail/test-performance-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { UniContainerPageComponent } from '@ksp/uni-service/pages';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
  {
    path: '',
    component: UniContainerPageComponent,
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
    RouterModule.forChild(routes),
  ],
  declarations: [TestPerformanceListComponent, TestPerformanceDetailComponent],
  exports: [TestPerformanceListComponent, TestPerformanceDetailComponent],
})
export class UniServiceFeatureTestPerformanceResultModule {}
