import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EServiceContainerPageComponent } from '@ksp/e-service/feature/container-page';
import { SharedUiBottomMenuModule } from '@ksp/shared/ui/bottom-menu';
import { ListPageComponent } from '@ksp/e-service/ethics/list-page';
import { MatDialogModule } from '@angular/material/dialog';
import { InvestigationMainComponent } from './investigation-main/investigation-main.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AccusationRecordComponent } from '@ksp/e-service/ethics/accusation';
import { InvestigationDetailComponent } from './investigation-detail/investigation-detail.component';

export const routes: Routes = [
  {
    path: '', // สืบสวน
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
        component: InvestigationMainComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedUiBottomMenuModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    MatTabsModule,
    AccusationRecordComponent,
    InvestigationDetailComponent,
  ],
  declarations: [InvestigationMainComponent],
  exports: [InvestigationMainComponent],
})
export class EServiceEthicsInvestigationModule {}
