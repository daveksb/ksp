import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseSearchComponent } from './course-search/course-search.component';

const routes: Routes = [
  {
    path: 'course-search',
    component: CourseSearchComponent,
  },
  {
    path: 'course-detail',
    component: CourseDetailComponent,
  },
  {
    path: '**',
    component: CourseSearchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UniServiceFeatureGraduateListRoutingModule {}
