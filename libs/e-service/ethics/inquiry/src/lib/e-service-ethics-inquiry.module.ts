import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { BottomNavComponent } from '@ksp/shared/menu';
import { InquiryMainComponent } from './inquiry-main/inquiry-main.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AccusationRecordComponent } from '@ksp/e-service/ethics/accusation';
import { MatDialogModule } from '@angular/material/dialog';
import { InquiryDetailComponent } from './inquiry-detail/inquiry-detail.component';
import { InquiryResultComponent } from './inquiry-result/inquiry-result.component';
import { TopNavComponent } from '@ksp/shared/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { FormInvestigationDetailComponent } from '@ksp/e-service/form';
import { InquiryListComponent } from './inquiry-list/inquiry-list.component';

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
        component: InquiryListComponent,
      },
      {
        path: 'detail',
        component: InquiryMainComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BottomNavComponent,
    RouterModule.forChild(routes),
    MatTabsModule,
    AccusationRecordComponent,
    MatDialogModule,
    InquiryDetailComponent,
    InquiryResultComponent,
    TopNavComponent,
    ReactiveFormsModule,
    FormInvestigationDetailComponent,
  ],
  declarations: [InquiryMainComponent],
  exports: [InquiryMainComponent],
})
export class EServiceEthicsInquiryModule {}
