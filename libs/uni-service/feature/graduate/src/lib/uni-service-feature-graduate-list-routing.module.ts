import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniContainerPageComponent } from '@ksp/uni-service/pages';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { DegreeListComponent } from './degree-list/degree-list.component';
import { ImportStudentComponent } from './import-student/import-student.component';

const routes: Routes = [
  {
    path: '',
    component: UniContainerPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'degree-list',
      },
      {
        path: 'degree-list',
        component: DegreeListComponent,
      },
      {
        path: 'course-detail/:type',
        component: CourseDetailComponent,
      },
      {
        path: 'import-student/:type',
        component: ImportStudentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniServiceFeatureGraduateRoutingModule {}
