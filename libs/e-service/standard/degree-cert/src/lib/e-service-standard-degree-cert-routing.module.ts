import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { ApproveComponent } from './approve/approve.component';
import { CheckComponent } from './check/check.component';
import { ConsiderComponent } from './consider/consider.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { EserviceEditDegreeDetailComponent } from './edit-degree-detail/e-service-edit-degree-detail.component';
import { EserviceEditStudentDetailComponent } from './edit-student-detail/edit-student-detail.component';
import { EserviceEditStudentListComponent } from './edit-student-list/edit-student-list.component';
import { FinalResultComponent } from './final-result/final-result.component';
import { FollowUpComponent } from './follow-up/follow-up.component';
import { ConsiderStudentComponent } from './import-student/consider-student/consider-student.component';
import { ImportStudentComponent } from './import-student/import-student.component';
import { EServiceDegreeCertApprovedListComponent } from './list-approved/e-service-degree-cert-list-approved.component';
import { EServiceDegreeCertListEditComponent } from './list-edit/e-service-degree-cert-list-edit.component';
import { EServiceDegreeCertListComponent } from './list/e-service-degree-cert-list.component';
import { VerifyComponent } from './verify/verify.component';

export const routes: Routes = [
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
        component: EServiceDegreeCertListComponent,
      },
      {
        path: 'list-edit-request',
        component: EServiceDegreeCertListEditComponent
      },
      {
        path: 'list/:type',
        component: EServiceDegreeCertListComponent,
      },
      {
        path: 'list/:type/:processId',
        component: EServiceDegreeCertListComponent,
      },
      {
        path: 'list-approved',
        component: EServiceDegreeCertApprovedListComponent
      },
      {
        path: 'check/:key', //ตรวจสอบ
        component: CheckComponent,
      },
      {
        path: 'verify/:type/:process',
        component: VerifyComponent,
      },
      {
        path: 'verify/:type/:process/:requestId',
        component: VerifyComponent,
      },
      {
        path: 'consider/:key', //พิจารณา
        component: ConsiderComponent,
      },
      {
        path: 'approve/:key', //ยืนยัน
        component: ApproveComponent,
      },
      {
        path: 'final-result/:key', //ขั้นตอนสุดท้าย
        component: FinalResultComponent,
      },
      {
        path: 'course-detail/:id',
        component: CourseDetailComponent
      },
      {
        path: 'student-list/:requestid',
        component: ImportStudentComponent
      },
      {
        path: 'consider-student',
        component: ConsiderStudentComponent
      },
      {
        path: 'follow-up',
        component: FollowUpComponent
      },
      {
        path: 'follow-up/:key',
        component: FollowUpComponent
      },
      {
        path: 'edit-student-list',
        component: EserviceEditStudentListComponent
      },
      {
        path: 'edit-student-detail/:id',
        component: EserviceEditStudentDetailComponent
      },
      {
        path: 'edit-degree-detail/:id',
        component: EserviceEditDegreeDetailComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EServiceStandardDegreeCertRoutingModule {}
