import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@ksp/shared/ui/page-not-found';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { InquiryDetailComponent } from './inquiry-detail/inquiry-detail.component';
import { InquiryResultComponent } from './inquiry-result/inquiry-result.component';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import { ListPageComponent } from '@ksp/e-service/ethics/list-page';

export const routes: Routes = [
  {
    path: '', // สอบสวน
    component: EServiceContainerPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ListPageComponent,
      },
      {
        path: 'detail',
        component: InquiryDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedUiBottomMenuModule,
    RouterModule.forChild(routes),
  ],
  declarations: [InquiryDetailComponent, InquiryResultComponent],
  exports: [InquiryDetailComponent, InquiryResultComponent],
})
export class EServiceEthicsInquiryModule {}
