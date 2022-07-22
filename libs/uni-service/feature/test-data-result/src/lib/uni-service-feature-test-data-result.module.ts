import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestDataListComponent } from './test-data-list/test-data-list.component';
import { TestDataDetailComponent } from './test-data-detail/test-data-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { UniContainerPageComponent } from '@ksp/uni-service/pages';
import { MatTableModule } from '@angular/material/table';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
        component: TestDataListComponent,
      },
      {
        path: 'detail',
        component: TestDataDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    TopNavComponent,
    MatCheckboxModule,
    BottomNavComponent,
    RouterModule.forChild(routes),
  ],
  declarations: [TestDataListComponent, TestDataDetailComponent],
  exports: [TestDataListComponent, TestDataDetailComponent],
})
export class UniServiceFeatureTestDataResultModule {}
