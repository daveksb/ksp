import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditDegreeListComponent } from './edit-degree-list/edit-degree-list.component';
import { MatTableModule } from '@angular/material/table';
import { BottomNavComponent, TopNavComponent } from '@ksp/shared/menu';
import { DegreeCertSearchComponent } from '@ksp/shared/search';
import { RouterModule, Routes } from '@angular/router';
import { UniContainerPageComponent } from '@ksp/uni-service/pages';
import { EditDegreeDetailComponent } from './edit-degree-detail/edit-degree-detail.component';
import { MatStepperModule } from '@angular/material/stepper';
import { RequestHeaderInfoComponent } from '@ksp/shared/ui';
import { SharedDegreeCertModule } from '@ksp/shared/degree-cert';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ThaiDatePipe } from '@ksp/shared/pipe';
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
        component: EditDegreeListComponent,
      },
      {
        path: 'detail',
        component: EditDegreeDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    TopNavComponent,
    DegreeCertSearchComponent,
    MatStepperModule,
    BottomNavComponent,
    RequestHeaderInfoComponent,
    SharedDegreeCertModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    RouterModule.forChild(routes),
    ThaiDatePipe,
    MatProgressSpinnerModule,
  ],
  declarations: [EditDegreeListComponent, EditDegreeDetailComponent],
  exports: [EditDegreeListComponent, EditDegreeDetailComponent],
})
export class UniServiceFeatureEditDegreeCertModule {}
