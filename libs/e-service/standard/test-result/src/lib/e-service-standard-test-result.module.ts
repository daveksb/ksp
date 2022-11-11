import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestDataListComponent } from './test-data-list/test-data-list.component';
import { TestDataDetailComponent } from './test-data-detail/test-data-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThaiDatePipe } from '@ksp/shared/pipe';

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
    MatDialogModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    ThaiDatePipe,
    RouterModule.forChild(routes),
  ],
  declarations: [TestDataListComponent, TestDataDetailComponent],
  exports: [TestDataListComponent, TestDataDetailComponent],
})
export class EServiceStandardTestResultModule {}
