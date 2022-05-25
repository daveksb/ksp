import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccusationListComponent } from './accusation-list/accusation-list.component';
import { AccusationRecordComponent } from './accusation-record/accusation-record.component';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { PageNotFoundComponent } from '@ksp/shared/ui/page-not-found';

export const routes: Routes = [
  {
    path: 'accusation', // กล่าวหา
    component: EServiceContainerPageComponent,
    children: [
      {
        path: 'list',
        component: AccusationListComponent,
      },
      {
        path: 'detail',
        component: AccusationRecordComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'investigation', // สืบสวน
    component: EServiceContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: PageNotFoundComponent,
      },
      {
        path: 'detail',
        component: PageNotFoundComponent,
      },
    ],
  },
  {
    path: 'inquiry', // สอบสวน
    component: EServiceContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: PageNotFoundComponent,
      },
      {
        path: 'detail',
        component: PageNotFoundComponent,
      },
    ],
  },
  {
    path: 'verdict', // ตรวจสอบและเผยแพร่คำวินิจฉัย
    component: EServiceContainerPageComponent,
    children: [
      {
        path: '',
        component: PageNotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [AccusationListComponent, AccusationRecordComponent],
  exports: [AccusationListComponent, AccusationRecordComponent],
})
export class EServiceFeatureEthicModule {}
