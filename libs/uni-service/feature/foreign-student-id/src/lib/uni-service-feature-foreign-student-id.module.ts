import { UniContainerPageComponent } from '@ksp/uni-service/pages';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavComponent } from '@ksp/shared/menu';
import { SharedFormOthersModule } from '@ksp/shared/form/others';

import { ForeignStudentIdComponent } from './foreign-student-id/foreign-student-id.component';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { ForeignStudentListComponent } from './foreign-student-list/foreign-student-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ForeignIdSearchComponent } from '@ksp/shared/search';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
        component: ForeignStudentListComponent,
      },
      {
        path: 'request',
        component: ForeignStudentIdComponent,
      },
    ],
  },
];
@NgModule({
  imports: [
    CommonModule,
    BottomNavComponent,
    SharedFormOthersModule,
    TopNavComponent,
    RequestHeaderInfoComponent,
    ReactiveFormsModule,
    ForeignIdSearchComponent,
    MatPaginatorModule,
    MatTableModule,
    RouterModule.forChild(routes),
    MatProgressSpinnerModule,
  ],
  declarations: [
    ForeignStudentIdComponent,
    ForeignStudentListComponent,
    ForeignStudentListComponent,
  ],
  exports: [ForeignStudentIdComponent, ForeignStudentListComponent],
})
export class UniServiceFeatureForeignStudentIdModule {}
