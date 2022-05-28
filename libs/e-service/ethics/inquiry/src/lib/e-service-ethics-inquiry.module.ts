import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@ksp/shared/ui/page-not-found';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';

export const routes: Routes = [
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
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class EServiceEthicsInquiryModule {}
